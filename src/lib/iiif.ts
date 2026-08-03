/**
 * IIIF Presentation API の v2 / v3 を吸収するアダプタ。
 *
 * 方針: 入力は v2 でも v3 でも受け取り、@iiif/parser の convertPresentation2 で
 * **内部的に v3 へ正規化**してから扱う。これにより領域抽出のロジックが 1 本で済む。
 *
 * 出力のキュレーションリストは Curation API 1.0 for IIIF が
 * Presentation API 2.1 の拡張であるため、P2 形式のまま生成する
 * （IIIF Curation Viewer など ICP のツール群との互換性を保つ）。
 */
import { convertPresentation2 } from '@iiif/parser/presentation-2';

type Json = any;

export type IIIFVersion = 2 | 3;

/** @context から Presentation API のバージョンを判定する。 */
export function detectVersion(resource: Json): IIIFVersion {
  const ctx = resource?.['@context'];
  const list: string[] = Array.isArray(ctx) ? ctx.map(String) : ctx ? [String(ctx)] : [];
  if (list.some((c) => c.includes('/presentation/3'))) return 3;
  if (list.some((c) => c.includes('/presentation/2'))) return 2;
  // @context が無い/独自の場合は形状で推定する
  if (resource?.items || resource?.type) return 3;
  return 2;
}

/** v2 なら v3 へ変換し、v3 ならそのまま返す。 */
export function toPresentation3(resource: Json): Json {
  return detectVersion(resource) === 2 ? convertPresentation2(resource) : resource;
}

/** v3 の label（言語マップ）を文字列にする。 */
export function label3(v: Json): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(label3).filter(Boolean).join(' / ');
  if (typeof v === 'object') {
    if (v['@value'] != null) return String(v['@value']);
    // 言語の優先順: ja → en → none → 先頭
    for (const k of ['ja', 'en', 'none']) {
      if (Array.isArray(v[k]) && v[k].length) return String(v[k][0]);
    }
    const first = Object.keys(v)[0];
    if (first && Array.isArray(v[first]) && v[first].length) return String(v[first][0]);
  }
  return String(v);
}

export type ExtractedRegion = {
  /** 領域を含む canvas URI（フラグメント付き） */
  target: string;
  /** canvas URI（フラグメントなし） */
  canvas: string;
  /** アノテーション本文から得たラベル */
  label: string;
};

function textOf(body: Json): string {
  if (!body) return '';
  if (Array.isArray(body)) return body.map(textOf).filter(Boolean).join(' ');
  if (typeof body === 'string') return body;
  const v = body.value ?? body.chars ?? label3(body.label);
  return String(v || '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

function targetOf(t: Json): string {
  if (!t) return '';
  if (typeof t === 'string') return t;
  // SpecificResource: { source, selector: { type: 'FragmentSelector', value: 'xywh=...' } }
  const source = typeof t.source === 'string' ? t.source : t.source?.id || t.id || t['@id'] || '';
  const sel = Array.isArray(t.selector) ? t.selector[0] : t.selector;
  const val = sel?.value || sel?.['@value'] || '';
  if (source && val) return `${source}#${val.replace(/^#/, '')}`;
  return source;
}

/**
 * v3 正規化済みのマニフェストから、矩形領域を持つアノテーションを集める。
 * 外部 AnnotationPage は fetchJson で解決する。
 */
export async function extractRegions(
  manifest3: Json,
  fetchJson: (url: string) => Promise<Json>
): Promise<{ regions: ExtractedRegion[]; canvases: number; skipped: number }> {
  const canvases: Json[] = manifest3.items || [];
  const regions: ExtractedRegion[] = [];
  let skipped = 0;

  for (const canvas of canvases) {
    const pages: Json[] = [];

    // 注釈は annotations（非描画）に入る。painting は本体画像なので対象外。
    for (const p of canvas.annotations || []) pages.push(p);

    for (const page of pages) {
      let resolved = page;
      // items を持たない参照だけの AnnotationPage は取得して解決する
      if (!Array.isArray(page.items) || page.items.length === 0) {
        const url = page.id || page['@id'];
        if (!url) continue;
        try {
          const fetched = await fetchJson(url);
          resolved = detectVersion(fetched) === 2 ? toPresentation3(fetched) : fetched;
          // v2 の sc:AnnotationList は resources を持つ
          if (!resolved.items && Array.isArray(fetched.resources)) {
            resolved = { items: fetched.resources.map(v2AnnoTo3) };
          }
        } catch {
          continue;
        }
      }

      for (const anno of resolved.items || []) {
        const target = targetOf(anno.target ?? anno.on);
        if (!target || !/#xywh=/.test(target)) {
          skipped += 1;
          continue;
        }
        regions.push({
          target,
          canvas: target.split('#')[0],
          label: textOf(anno.body ?? anno.resource) || label3(canvas.label) || `[${regions.length + 1}]`,
        });
      }
    }
  }

  return { regions, canvases: canvases.length, skipped };
}

export type CanvasImage = {
  /** IIIF Image API のベース URI（末尾スラッシュなし） */
  service: string;
  width: number;
  height: number;
};

/**
 * v3 正規化済みマニフェストから canvas ID → Image API サービスの対応を作る。
 * 領域サムネイル（/{x},{y},{w},{h}/{size}/0/default.jpg）の組み立てに使う。
 */
export function resolveImageServices(manifest3: Json): Record<string, CanvasImage> {
  const out: Record<string, CanvasImage> = {};
  for (const canvas of manifest3.items || []) {
    for (const page of canvas.items || []) {
      for (const anno of page.items || []) {
        const body = Array.isArray(anno.body) ? anno.body[0] : anno.body;
        if (!body) continue;
        const services = body.service || body.services || [];
        const list = Array.isArray(services) ? services : [services];
        const svc = list.find((s: Json) => s && (s.id || s['@id']));
        const id = svc ? svc.id || svc['@id'] : null;
        if (!id) continue;
        out[canvas.id] = {
          service: String(id).replace(/\/$/, ''),
          width: canvas.width || body.width || 0,
          height: canvas.height || body.height || 0,
        };
      }
    }
  }
  return out;
}

/** 領域を切り出したサムネイル URL を組み立てる。 */
export function regionUrl(
  service: string,
  xywh: { x: number; y: number; w: number; h: number },
  size = '!400,400'
): string {
  return `${service}/${xywh.x},${xywh.y},${xywh.w},${xywh.h}/${size}/0/default.jpg`;
}

/** v2 の oa:Annotation を v3 相当の形に寄せる（最小限）。 */
function v2AnnoTo3(a: Json): Json {
  return {
    id: a['@id'],
    type: 'Annotation',
    motivation: a.motivation,
    body: a.resource,
    target: a.on,
  };
}

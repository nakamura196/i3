/**
 * i3 — IIIF Presentation API 2.1 と Curation API 1.0 for IIIF の相互変換コア。
 *
 * 依存ライブラリなし。サーバ（Route Handler）とクライアント（画面）の
 * どちらからも同じロジックを使う。
 *
 * 仕様: http://codh.rois.ac.jp/iiif/curation/
 */

import { detectVersion, toPresentation3, label3, extractRegions } from './iiif';

export const PRESENTATION_CONTEXT = 'http://iiif.io/api/presentation/2/context.json';
export const CURATION_CONTEXT = 'http://codh.rois.ac.jp/iiif/curation/1/context.json';

type Json = any;

export type ManifestSummary = {
  id: string;
  label: string;
  canvases: number;
  regions: number;
};

export type Region = {
  id: string;
  canvas: string;
  xywh: { x: number; y: number; w: number; h: number } | null;
  label: string;
  manifest: string;
  manifestLabel: string;
  metadata: Record<string, string>;
};

/** IIIF の label は文字列・言語オブジェクト・配列のいずれもありうる。 */
export function toLabel(v: Json): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return v.map(toLabel).filter(Boolean).join(' / ');
  if (typeof v === 'object') {
    if (v['@value'] != null) return String(v['@value']);
    const first = Object.keys(v)[0];
    if (first && Array.isArray(v[first])) return String(v[first][0]);
  }
  return String(v);
}

/** "...#xywh=1,2,3,4" を base と fragment に割る。 */
export function splitFragment(uri: string): { base: string; fragment: string } {
  const s = String(uri);
  const i = s.indexOf('#');
  if (i === -1) return { base: s, fragment: '' };
  return { base: s.slice(0, i), fragment: s.slice(i + 1) };
}

export function parseXywh(fragment: string) {
  const m = /xywh=(\d+),(\d+),(\d+),(\d+)/.exec(fragment || '');
  if (!m) return null;
  return { x: +m[1], y: +m[2], w: +m[3], h: +m[4] };
}

/** selections[] の要素は members(オブジェクト) か canvases(文字列) を持つ。 */
function selectionItems(sel: Json): Json[] {
  if (Array.isArray(sel.members)) return sel.members;
  if (Array.isArray(sel.canvases)) {
    return sel.canvases.map((c: string) => ({ '@id': c, '@type': 'sc:Canvas' }));
  }
  return [];
}

function withinOf(sel: Json) {
  let w = sel.within;
  if (!w) return null;
  if (typeof w === 'string') return { '@id': w, '@type': 'sc:Manifest', label: '' };
  if (Array.isArray(w)) w = w[0];
  return { '@id': w['@id'], '@type': w['@type'] || 'sc:Manifest', label: toLabel(w.label) };
}

export function isCuration(json: Json): boolean {
  return !!json && (json['@type'] === 'cr:Curation' || Array.isArray(json.selections));
}

export function isManifest(json: Json): boolean {
  return !!json && (json['@type'] === 'sc:Manifest' || !!json.sequences);
}

/* ------------------------------------------------ Curation -> Collection */

/**
 * キュレーションリストを IIIF Collection に変換する。
 * selections を within（出典マニフェスト）ごとに畳み込み、
 * 異なりマニフェストの一覧からなる sc:Collection を組み立てる。
 *
 * 例: 『百鬼夜行図』のキュレーション 1 件 →
 *     東京大学総合図書館・国文学研究資料館・国立国会図書館の 3 マニフェスト
 */
export function curationToCollection(curation: Json, opts: { id?: string } = {}) {
  if (!isCuration(curation)) {
    throw new Error('キュレーションリストではありません（@type: cr:Curation を期待）。');
  }

  const order: string[] = [];
  const byId: Record<string, { label: string; regions: number; canvases: Set<string> }> = {};

  for (const sel of curation.selections || []) {
    const w = withinOf(sel);
    if (!w || !w['@id']) continue;
    if (!byId[w['@id']]) {
      byId[w['@id']] = { label: w.label, regions: 0, canvases: new Set() };
      order.push(w['@id']);
    }
    const entry = byId[w['@id']];
    for (const m of selectionItems(sel)) {
      const parts = splitFragment(m['@id']);
      entry.canvases.add(parts.base);
      if (parseXywh(parts.fragment)) entry.regions += 1;
    }
  }

  const manifests = order.map((id) => {
    const e = byId[id];
    const out: Json = { '@id': id, '@type': 'sc:Manifest' };
    if (e.label) out.label = e.label;
    return out;
  });

  const collection: Json = {
    '@context': PRESENTATION_CONTEXT,
    '@id': opts.id || (curation['@id'] ? `${curation['@id']}/collection` : 'https://example.org/collection'),
    '@type': 'sc:Collection',
    label: toLabel(curation.label) || 'Untitled curation',
    manifests,
  };

  if (curation['@id']) {
    collection.within = {
      '@id': curation['@id'],
      '@type': 'cr:Curation',
      label: toLabel(curation.label),
    };
  }

  const summary: ManifestSummary[] = order.map((id) => ({
    id,
    label: byId[id].label,
    canvases: byId[id].canvases.size,
    regions: byId[id].regions,
  }));

  return { collection, summary };
}

/* ------------------------------------------------ Manifest -> Curation */

export type FetchJson = (url: string) => Promise<Json>;

export const defaultFetchJson: FetchJson = async (url) => {
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${url}`);
  return r.json();
};

/**
 * アノテーション付きマニフェストからアノテーションを集め、
 * 切り出し領域を members に持つキュレーションリストを組み立てる。
 *
 * **入力は IIIF Presentation API v2 / v3 のどちらでもよい。**
 * 内部では @iiif/parser で v3 に正規化してから領域を抽出する（src/lib/iiif.ts）。
 * 出力は Curation API 1.0 for IIIF が P2.1 の拡張であるため P2 形式で生成し、
 * ICP のツール群との互換性を保つ。
 *
 * 外部 AnnotationPage / AnnotationList は fetchJson で解決する。
 */
export async function manifestToCuration(
  manifest: Json,
  opts: { id?: string; rangeLabel?: string; fetchJson?: FetchJson } = {}
) {
  const fetchJson = opts.fetchJson || defaultFetchJson;

  const version = detectVersion(manifest);
  const manifest3 = toPresentation3(manifest);

  if (manifest3?.type !== 'Manifest' && !manifest3?.items) {
    throw new Error('マニフェストではありません（Manifest を期待）。');
  }

  const manifestId: string = manifest3.id || manifest['@id'];
  const manifestLabel = label3(manifest3.label) || toLabel(manifest.label);

  const extracted = await extractRegions(manifest3, fetchJson);
  const members: Json[] = extracted.regions.map((r) => ({
    '@id': r.target,
    '@type': 'sc:Canvas',
    label: r.label,
  }));
  const curationId =
    opts.id ||
    (manifestId
      ? `${manifestId.replace(/\/manifest(\.json)?$/, '')}/curation.json`
      : 'https://example.org/curation.json');

  const curation: Json = {
    '@context': [PRESENTATION_CONTEXT, CURATION_CONTEXT],
    '@type': 'cr:Curation',
    '@id': curationId,
    label: manifestLabel || 'Untitled',
    selections: [
      {
        '@id': `${curationId}/range1`,
        '@type': 'sc:Range',
        label: opts.rangeLabel || 'Automatic curation by IIIF Converter',
        members,
        within: { '@id': manifestId, '@type': 'sc:Manifest', label: manifestLabel },
      },
    ],
  };

  return {
    curation,
    summary: {
      version,
      canvases: extracted.canvases,
      regions: members.length,
      skipped: extracted.skipped,
    },
  };
}

/* ------------------------------------------------------------- viewers */

/** キュレーションから、ビューア表示・検索用の領域一覧を作る。 */
export function collectRegions(curation: Json): Region[] {
  const out: Region[] = [];
  for (const sel of curation.selections || []) {
    const w = withinOf(sel) || ({} as Json);
    for (const m of selectionItems(sel)) {
      const parts = splitFragment(m['@id']);
      const metadata: Record<string, string> = {};
      for (const kv of m.metadata || []) {
        metadata[toLabel(kv.label ?? kv['@label'])] = toLabel(kv.value ?? kv['@value']);
      }
      out.push({
        id: m['@id'],
        canvas: parts.base,
        xywh: parseXywh(parts.fragment),
        label: toLabel(m.label),
        manifest: w['@id'] || '',
        manifestLabel: w.label || '',
        metadata,
      });
    }
  }
  return out;
}

/** IIIF Image API の情報から、領域を切り出したサムネイル URL を作る。 */
export function regionThumbUrl(canvasId: string, xywh: Region['xywh'], size = 200): string | null {
  if (!xywh) return null;
  // canvas URI から Image API のベースを推定する（.../canvas/pN → 同一サーバの image）
  // 多くの実装で canvas と image のベースが異なるため、呼び出し側が
  // manifest から解決できない場合のフォールバックとしてのみ使う。
  const base = canvasId.replace(/\/canvas\/[^/]+$/, '');
  return `${base}/${xywh.x},${xywh.y},${xywh.w},${xywh.h}/!${size},${size}/0/default.jpg`;
}

/** 外部ビューアへ渡すリンク集。変換結果に解決可能な URL があるときに使う。 */
export function viewerLinks(curationUrl: string) {
  const e = encodeURIComponent(curationUrl);
  return [
    { name: 'IIIF Curation Viewer', url: `https://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${e}&lang=ja` },
    { name: 'セルフミュージアム', url: `https://cultural.jp/museum?curation=${e}` },
    { name: 'IIIF Curation Comparison', url: `/icc?u=${e}` },
    { name: 'IIIF Curation Map Search', url: `/map?u=${e}` },
  ];
}

export function collectionViewerLinks(collectionUrl: string) {
  const e = encodeURIComponent(collectionUrl);
  return [
    { name: 'Mirador', url: `https://codh.rois.ac.jp/software/iiif-curation-viewer/mirador/?manifest=${e}` },
    { name: 'Universal Viewer', url: `https://uv-v4.netlify.app/#?iiifManifestId=${e}` },
  ];
}

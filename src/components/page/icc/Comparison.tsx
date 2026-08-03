'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { collectRegions, type Region } from '@/lib/i3';
import { toPresentation3, resolveImageServices, regionUrl, type CanvasImage } from '@/lib/iiif';

const EXAMPLE = 'https://mp.ex.nii.ac.jp/api/curation/json/388b085f-772e-472d-8866-9951747c6719';

/** CORS が通らないときだけ /api/fetch にフォールバックする。 */
async function fetchJson(url: string) {
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (r.ok) return await r.json();
  } catch {
    /* CORS 等。プロキシに回す */
  }
  const p = await fetch(`/api/fetch?u=${encodeURIComponent(url)}`);
  const j = await p.json();
  if (!p.ok) throw new Error(j?.error || `HTTP ${p.status}`);
  return j;
}

export default function Comparison() {
  const t = useTranslations('Comparison');
  const tc = useTranslations('Common');

  const [uri, setUri] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const [images, setImages] = useState<Record<string, CanvasImage>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const load = useCallback(async (value: string) => {
    const target = value.trim();
    if (!target) return;
    setBusy(true);
    setError('');
    setRegions([]);
    setSelected(new Set());
    try {
      const curation = await fetchJson(target);
      const rs = collectRegions(curation).filter((r) => r.xywh);
      setRegions(rs);

      // 出典マニフェストを引いて Image API のベースを解決する
      const manifestIds = Array.from(new Set(rs.map((r) => r.manifest).filter(Boolean)));
      const map: Record<string, CanvasImage> = {};
      await Promise.all(
        manifestIds.map(async (mid) => {
          try {
            const m = await fetchJson(mid);
            Object.assign(map, resolveImageServices(toPresentation3(m)));
          } catch {
            /* 引けないマニフェストは飛ばす */
          }
        })
      );
      setImages(map);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }, []);

  // ?u=... で開かれたときは自動実行する（スライド記載のディープリンク互換）。
  // effect 内で setState を同期的に呼ぶと連鎖レンダリングになるため次のタスクへ送る。
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('u');
    if (!u) return;
    const id = setTimeout(() => {
      setUri(u);
      void load(u);
    }, 0);
    return () => clearTimeout(id);
  }, [load]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const thumb = (r: Region) => {
    const img = images[r.canvas];
    if (!img || !r.xywh) return null;
    return regionUrl(img.service, r.xywh, '!300,300');
  };

  const chosen = regions.filter((r) => selected.has(r.id));

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          load(uri);
        }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('curationUri')}
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            placeholder="https://…"
            className="flex-1 min-w-0 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 font-mono text-sm text-gray-900 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={busy || !uri.trim()}
            className="rounded-md bg-blue-600 px-5 py-2 text-white disabled:opacity-50 hover:bg-blue-700"
          >
            {busy ? tc('loading') : tc('run')}
          </button>
          <button
            type="button"
            onClick={() => {
              setUri(EXAMPLE);
              load(EXAMPLE);
            }}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
          >
            {tc('example')}
          </button>
        </div>
      </form>

      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {tc('error')}: {error}
        </p>
      )}

      {chosen.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('selected')}（{chosen.length}）
            </h2>
            <button
              onClick={() => setSelected(new Set())}
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
            >
              {t('clear')}
            </button>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {chosen.map((r) => {
              const src = thumb(r);
              return (
                <figure
                  key={r.id}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800"
                >
                  {src ? (
                    <img src={src} alt={r.label} className="w-full h-44 object-contain bg-gray-50 dark:bg-gray-900" />
                  ) : (
                    <div className="h-44 grid place-items-center text-xs text-gray-400">no image</div>
                  )}
                  <figcaption className="p-2 text-xs">
                    <div className="font-medium text-gray-900 dark:text-gray-100 truncate">{r.label}</div>
                    <div className="text-gray-500 dark:text-gray-400 truncate">{r.manifestLabel}</div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {regions.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">
            {t('regions')}（{regions.length}）
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('selectHint')}</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {regions.map((r) => {
              const src = thumb(r);
              const on = selected.has(r.id);
              return (
                <button
                  key={r.id}
                  onClick={() => toggle(r.id)}
                  className={`text-left rounded-lg border overflow-hidden transition ${
                    on
                      ? 'border-blue-500 ring-2 ring-blue-500/40'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                  }`}
                >
                  {src ? (
                    <img src={src} alt={r.label} className="w-full h-24 object-contain bg-gray-50 dark:bg-gray-900" />
                  ) : (
                    <div className="h-24 grid place-items-center text-xs text-gray-400">no image</div>
                  )}
                  <span className="block p-1.5 text-[11px] leading-tight text-gray-700 dark:text-gray-300 truncate">
                    {r.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

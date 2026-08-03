'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { collectRegions, type Region } from '@/lib/i3';
import { toPresentation3, resolveImageServices, regionUrl, type CanvasImage } from '@/lib/iiif';

/** 東洋文庫『大明地理之図』のような、大きな一枚画像＋大量アノテーションを想定。 */
const EXAMPLE = 'https://mp.ex.nii.ac.jp/api/curation/json/388b085f-772e-472d-8866-9951747c6719';

async function fetchJson(url: string) {
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (r.ok) return await r.json();
  } catch {
    /* CORS 等 */
  }
  const p = await fetch(`/api/fetch?u=${encodeURIComponent(url)}`);
  const j = await p.json();
  if (!p.ok) throw new Error(j?.error || `HTTP ${p.status}`);
  return j;
}

export default function MapSearch() {
  const t = useTranslations('MapSearch');
  const tc = useTranslations('Common');

  const [uri, setUri] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [regions, setRegions] = useState<Region[]>([]);
  const [images, setImages] = useState<Record<string, CanvasImage>>({});
  const [q, setQ] = useState('');
  const [active, setActive] = useState<Region | null>(null);

  const load = useCallback(async (value: string) => {
    const target = value.trim();
    if (!target) return;
    setBusy(true);
    setError('');
    setRegions([]);
    setActive(null);
    try {
      const curation = await fetchJson(target);
      const rs = collectRegions(curation).filter((r) => r.xywh);
      setRegions(rs);

      const manifestIds = Array.from(new Set(rs.map((r) => r.manifest).filter(Boolean)));
      const map: Record<string, CanvasImage> = {};
      await Promise.all(
        manifestIds.map(async (mid) => {
          try {
            const m = await fetchJson(mid);
            Object.assign(map, resolveImageServices(toPresentation3(m)));
          } catch {
            /* skip */
          }
        })
      );
      setImages(map);
      if (rs.length) setActive(rs[0]);
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

  // ラベルとメタデータの全文を対象に絞り込む
  const hits = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return regions;
    return regions.filter((r) => {
      const hay = [r.label, r.manifestLabel, ...Object.values(r.metadata)].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [regions, q]);

  const detailUrl = (r: Region | null, size: string) => {
    if (!r || !r.xywh) return null;
    const img = images[r.canvas];
    if (!img) return null;
    return regionUrl(img.service, r.xywh, size);
  };

  const activeSrc = detailUrl(active, '!900,900');

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

      {regions.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          {/* 拡大表示 */}
          <div className="order-2 lg:order-1">
            {activeSrc ? (
              <figure className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img src={activeSrc} alt={active?.label || ''} className="w-full object-contain max-h-[34rem]" />
                <figcaption className="p-3 text-sm border-t border-gray-200 dark:border-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{active?.label}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">{active?.manifestLabel}</div>
                  {active && Object.keys(active.metadata).length > 0 && (
                    <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                      {Object.entries(active.metadata).map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="text-gray-500 dark:text-gray-400">{k}</dt>
                          <dd className="text-gray-800 dark:text-gray-200">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </figcaption>
              </figure>
            ) : (
              <p className="text-sm text-gray-500">{t('clickToZoom')}</p>
            )}
          </div>

          {/* 検索と一覧 */}
          <div className="order-1 lg:order-2 space-y-3">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('search')}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {hits.length} {t('hits')} / {regions.length}
            </p>
            <ul className="max-h-[30rem] overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 rounded-md border border-gray-200 dark:border-gray-700">
              {hits.length === 0 && (
                <li className="p-3 text-sm text-gray-500">{t('noHits')}</li>
              )}
              {hits.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => setActive(r)}
                    className={`flex w-full items-center gap-2 p-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      active?.id === r.id ? 'bg-blue-50 dark:bg-blue-950' : ''
                    }`}
                  >
                    {detailUrl(r, '!80,80') && (
                        <img
                        src={detailUrl(r, '!80,80')!}
                        alt=""
                        className="h-10 w-10 shrink-0 object-cover rounded"
                        loading="lazy"
                      />
                    )}
                    <span className="min-w-0 text-xs">
                      <span className="block truncate text-gray-900 dark:text-gray-100">{r.label}</span>
                      <span className="block truncate text-gray-500 dark:text-gray-400">
                        {Object.values(r.metadata).join(' / ') || r.manifestLabel}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Direction = 'toCuration' | 'toCollection';

const EXAMPLES: Record<Direction, string> = {
  // アノテーション付きマニフェスト（東京帝國大學本部構内及農學部建物鳥瞰圖）
  toCuration: 'https://nakamura196.github.io/portal_pro/usage/agriculture/manifest.json',
  // 『百鬼夜行図』のキュレーション（東大・国文研・NDL の 3 マニフェストにまたがる）
  toCollection: 'https://mp.ex.nii.ac.jp/api/curation/json/388b085f-772e-472d-8866-9951747c6719',
};

type Json = any;

type SummaryToCuration = { version: number; canvases: number; regions: number; skipped: number };
type SourceManifest = { '@id': string; label?: string };

export default function Converter({ direction }: { direction: Direction }) {
  const t = useTranslations('Converter');
  const tc = useTranslations('Common');

  const [uri, setUri] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Json>(null);
  const [apiUrl, setApiUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const endpoint = direction === 'toCuration' ? '/api/curation' : '/api/collection';

  const run = useCallback(
    async (value: string) => {
      const target = value.trim();
      if (!target) return;
      setBusy(true);
      setError('');
      setResult(null);
      const url = `${endpoint}?u=${encodeURIComponent(target)}`;
      setApiUrl(new URL(url, window.location.origin).toString());
      try {
        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        setResult(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setBusy(false);
      }
    },
    [endpoint]
  );

  // ?u=... で直接開かれたときは自動実行する（スライド記載のディープリンク互換）。
  // effect 内で setState を同期的に呼ぶと連鎖レンダリングになるため次のタスクへ送る。
  useEffect(() => {
    const u = new URLSearchParams(window.location.search).get('u');
    if (!u) return;
    const id = setTimeout(() => {
      setUri(u);
      void run(u);
    }, 0);
    return () => clearTimeout(id);
  }, [run]);

  const summary: SummaryToCuration | null =
    direction === 'toCuration' && result?.selections
      ? {
          version: 0,
          canvases: 0,
          regions: result.selections[0]?.members?.length ?? 0,
          skipped: 0,
        }
      : null;

  const sources: SourceManifest[] =
    direction === 'toCollection' && result?.manifests ? result.manifests : [];

  const copy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const viewers =
    direction === 'toCuration' && apiUrl
      ? [
          {
            name: 'IIIF Curation Viewer',
            url: `https://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?curation=${encodeURIComponent(apiUrl)}&lang=ja`,
          },
          { name: 'IIIF Curation Comparison', url: `/icc?u=${encodeURIComponent(apiUrl)}` },
          { name: 'IIIF Curation Map Search', url: `/map?u=${encodeURIComponent(apiUrl)}` },
        ]
      : [];

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(uri);
        }}
        className="space-y-3"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {direction === 'toCuration' ? t('manifestUri') : t('curationUri')}
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
              setUri(EXAMPLES[direction]);
              run(EXAMPLES[direction]);
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

      {result && (
        <>
          {summary && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('regions')}: <strong>{summary.regions}</strong>
            </p>
          )}

          {sources.length > 0 && (
            <div>
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {t('sourceManifests')}（{sources.length}）
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">
                        {t('label')}
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">
                        {t('uri')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.map((m) => (
                      <tr key={m['@id']}>
                        <td className="border border-gray-300 dark:border-gray-600 p-2">
                          {m.label || '—'}
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 p-2 break-all font-mono text-xs">
                          <a
                            href={m['@id']}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {m['@id']}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {tc('apiUrl')}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {direction === 'toCuration'
                ? 'この URL 自体がキュレーションリストの永続 URI です。'
                : 'この URL 自体が IIIF コレクションの永続 URI です。'}
            </p>
            <code className="block break-all rounded-md bg-gray-100 dark:bg-gray-800 p-3 text-xs">
              {apiUrl}
            </code>
          </div>

          {viewers.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {viewers.map((v) => (
                <a
                  key={v.name}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {v.name}
                </a>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {tc('result')}
              </h3>
              <button
                onClick={copy}
                className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-gray-300"
              >
                {copied ? tc('copied') : tc('copy')}
              </button>
            </div>
            <pre className="max-h-[28rem] overflow-auto rounded-md bg-gray-100 dark:bg-gray-800 p-4 text-xs leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

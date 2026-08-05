'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

const VERSION = '5.17.14';
const CSS = `https://unpkg.com/swagger-ui-dist@${VERSION}/swagger-ui.css`;
const JS = `https://unpkg.com/swagger-ui-dist@${VERSION}/swagger-ui-bundle.js`;

declare global {
  interface Window {
    SwaggerUIBundle?: (config: Record<string, unknown>) => unknown;
  }
}

function loadOnce(id: string, create: () => HTMLElement): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error(id)));
      }
      return;
    }
    const el = create();
    el.id = id;
    el.addEventListener('load', () => {
      el.dataset.loaded = 'true';
      resolve();
    });
    el.addEventListener('error', () => reject(new Error(id)));
    document.head.appendChild(el);
  });
}

export default function SwaggerUI() {
  const mounted = useRef(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    (async () => {
      try {
        await loadOnce('swagger-ui-css', () => {
          const l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = CSS;
          return l;
        });
        await loadOnce('swagger-ui-js', () => {
          const s = document.createElement('script');
          s.src = JS;
          s.crossOrigin = 'anonymous';
          return s;
        });
        if (!window.SwaggerUIBundle) throw new Error('SwaggerUIBundle が読み込めませんでした。');
        window.SwaggerUIBundle({
          url: '/api/openapi',
          dom_id: '#swagger-ui',
          deepLinking: true,
          docExpansion: 'list',
          defaultModelsExpandDepth: 1,
          tryItOutEnabled: true,
        });
        setReady(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  return (
    <div>
      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-950 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          Swagger UI の読み込みに失敗しました: {error}
          <br />
          仕様は{' '}
          {/* ページではなく API ルートなので next/link ではなく <a> でよい */}
          <a href="/api/openapi" className="underline" target="_blank" rel="noopener noreferrer">
            /api/openapi
          </a>{' '}
          から直接取得できます。
        </p>
      )}
      {!ready && !error && <p className="text-sm text-gray-500">読み込み中…</p>}
      {/*
        Swagger UI は自前の配色を持つため、ダークテーマでは
        反転フィルタで見た目を合わせる（CSS を上書きするより破綻が少ない）。
      */}
      <div
        id="swagger-ui"
        className="swagger-host"
        style={
          resolvedTheme === 'dark'
            ? { filter: 'invert(0.92) hue-rotate(180deg)', background: 'transparent' }
            : undefined
        }
      />
      <style jsx global>{`
        .swagger-host .swagger-ui .topbar,
        .swagger-host .swagger-ui .information-container {
          display: none;
        }
        .swagger-host .swagger-ui {
          font-family: inherit;
        }
        .swagger-host img {
          filter: none;
        }
      `}</style>
    </div>
  );
}

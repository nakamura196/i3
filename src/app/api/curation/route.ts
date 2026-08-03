import { NextRequest, NextResponse } from 'next/server';
import { manifestToCuration, defaultFetchJson } from '@/lib/i3';

/**
 * GET /api/curation?u=<IIIF Manifest URI>
 *
 * アノテーション付きマニフェストを Curation API 1.0 for IIIF の
 * キュレーションリストに変換して返す。
 *
 * ステートレスなので、この URL 自体がキュレーションリストの永続 URI として
 * 使える（セルフミュージアムや IIIF Curation Viewer にそのまま渡せる）。
 */

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get('u');
  if (!u) {
    return json({ error: 'クエリパラメータ u に IIIF マニフェストの URI を指定してください。' }, 400);
  }
  if (!/^https?:\/\//i.test(u)) {
    return json({ error: 'u は http(s) の絶対 URI である必要があります。' }, 400);
  }

  try {
    const manifest = await defaultFetchJson(u);
    const { curation } = await manifestToCuration(manifest, {
      id: req.nextUrl.href,
      fetchJson: defaultFetchJson,
    });
    return json(curation, 200);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 502);
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors() });
}

function cors(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      ...cors(),
      // 変換は決定的なので長めにキャッシュしてよい
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

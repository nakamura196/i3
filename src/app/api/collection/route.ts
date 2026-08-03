import { NextRequest, NextResponse } from 'next/server';
import { curationToCollection, defaultFetchJson } from '@/lib/i3';

/**
 * GET /api/collection?u=<IIIF Curation List URI>
 *
 * キュレーションリストを、出典マニフェストの一覧からなる
 * IIIF Collection (sc:Collection) に変換して返す。
 *
 * 例: 『百鬼夜行図』のキュレーション 1 件 →
 *     東京大学総合図書館・国文学研究資料館・国立国会図書館の 3 マニフェスト
 */

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get('u');
  if (!u) {
    return json({ error: 'クエリパラメータ u にキュレーションリストの URI を指定してください。' }, 400);
  }
  if (!/^https?:\/\//i.test(u)) {
    return json({ error: 'u は http(s) の絶対 URI である必要があります。' }, 400);
  }

  try {
    const curation = await defaultFetchJson(u);
    const { collection } = curationToCollection(curation, { id: req.nextUrl.href });
    return json(collection, 200);
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
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

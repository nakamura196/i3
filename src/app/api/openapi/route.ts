import { NextRequest, NextResponse } from 'next/server';
import { buildOpenApiDocument } from '@/lib/openapi';

/**
 * GET /api/openapi
 *
 * i3 の Web API を記述した OpenAPI 3.1 ドキュメント。
 * /api-docs の Swagger UI がこれを読み込む。
 *
 * servers はリクエスト元のオリジンから組み立てるので、
 * プレビュー環境やローカルでも「Try it out」がそのまま動く。
 */
export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  return NextResponse.json(buildOpenApiDocument(origin), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}

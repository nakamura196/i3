import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Skip proxy for static files and API routes.
  //
  // `api/` と末尾スラッシュまで含めて除外する。`api` だけだと api で始まる
  // 通常ページ（例: /api-docs）まで i18n の対象外になり、既定ロケールの
  // 無印パスが 404 になる。
  matcher: ['/((?!api/|_next|_vercel|.*\\..*).*)']
};
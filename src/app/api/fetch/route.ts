import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/fetch?u=<URI>
 *
 * CORS ヘッダを返さない IIIF サーバのリソースをブラウザから読むための中継。

 * JSON のみを対象とし、内部ネットワーク宛ての要求は遮断する（SSRF 対策）。
 *
 * CORS が通るサーバに対しては不要なので、画面側はまず直接取得を試み、
 * 失敗したときだけこの経路にフォールバックする。
 */

const MAX_BYTES = 8 * 1024 * 1024;

/** ループバック・プライベート・リンクローカル・特殊用途アドレスを弾く。 */
function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.internal') || h.endsWith('.local')) {
    return true;
  }
  // IPv6 ループバック / ユニークローカル / リンクローカル
  if (h === '::1' || h === '::' || /^f[cd][0-9a-f]{2}:/i.test(h) || /^fe80:/i.test(h)) return true;

  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
  if (m) {
    const [a, b] = [ +m[1], +m[2] ];
    if (a === 0 || a === 10 || a === 127) return true;              // 0.x, 10.x, loopback
    if (a === 169 && b === 254) return true;                        // link-local / metadata
    if (a === 172 && b >= 16 && b <= 31) return true;               // 172.16-31.x
    if (a === 192 && b === 168) return true;                        // 192.168.x
    if (a === 100 && b >= 64 && b <= 127) return true;              // CGNAT
    if (a >= 224) return true;                                      // multicast / reserved
  }
  return false;
}

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get('u');
  if (!u) return json({ error: 'クエリパラメータ u に取得先の URI を指定してください。' }, 400);

  let target: URL;
  try {
    target = new URL(u);
  } catch {
    return json({ error: 'u が URI として解釈できません。' }, 400);
  }
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return json({ error: 'http(s) のみ中継します。' }, 400);
  }
  if (isBlockedHost(target.hostname)) {
    return json({ error: '内部ネットワーク宛ての中継は許可されていません。' }, 403);
  }

  try {
    const r = await fetch(target.toString(), {
      headers: { Accept: 'application/json, application/ld+json;q=0.9, */*;q=0.1' },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return json({ error: `取得先が HTTP ${r.status} を返しました。` }, 502);

    const len = Number(r.headers.get('content-length') || 0);
    if (len && len > MAX_BYTES) return json({ error: '応答が大きすぎます（8MB 上限）。' }, 502);

    const text = await r.text();
    if (text.length > MAX_BYTES) return json({ error: '応答が大きすぎます（8MB 上限）。' }, 502);

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return json({ error: 'JSON として解釈できませんでした。' }, 502);
    }
    return json(parsed, 200);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ error: `取得に失敗しました: ${msg}` }, 502);
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
    headers: { ...cors(), 'Cache-Control': 'public, max-age=300, s-maxage=1800' },
  });
}

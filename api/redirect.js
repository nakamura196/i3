// i3 はサービスを終了し、Kasane に移った。古い URL を Kasane の同じ働きの画面へ転送する。
// vercel.json の rewrites で、すべてのパスがここに来る（元のパスは __path に入る）。

const KASANE = 'https://kasane.ldas.jp';

// i3 の画面 → Kasane の画面と、?u= を渡す引数
const ROUTES = {
  'conv/convert2manifest': { page: 'viewer', param: 'curation' },
  'conv/convert2curation': { page: 'viewer', param: 'manifest' },
  icc: { page: 'compare', param: 'curation' },
  map: { page: 'viewer', param: 'curation' },
};

module.exports = (req, res) => {
  const url = new URL(req.url, 'https://i3-mu.vercel.app');
  const segments = (url.searchParams.get('__path') || '').split('/').filter(Boolean);

  // 変換 API はプログラムから呼ばれる。HTML に飛ばしても動かないので、終了をはっきり返す。
  if (segments[0] === 'api') {
    res.statusCode = 410;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: 'Gone',
        message:
          'The i3 conversion API has been discontinued. Curations can be viewed in Kasane: https://kasane.ldas.jp/ja/viewer/?curation=<URL>',
        successor: KASANE,
      })
    );
    return;
  }

  const locale = segments[0] === 'en' ? 'en' : 'ja';
  if (segments[0] === 'en' || segments[0] === 'ja') segments.shift();

  const route = ROUTES[segments.join('/')];
  const u = url.searchParams.get('u');
  let location = `${KASANE}/${locale}/`;
  if (route && u) {
    location = `${KASANE}/${locale}/${route.page}/?${route.param}=${encodeURIComponent(u)}`;
  } else if (route) {
    location = `${KASANE}/${locale}/${route.page}/`;
  }

  res.statusCode = 301;
  res.setHeader('Location', location);
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.end();
};

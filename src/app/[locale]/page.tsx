import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Props = { params: Promise<{ locale: 'ja' | 'en' }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Home' });
  const tApi = await getTranslations({ locale, namespace: 'ApiDocs' });

  const tools = [
    { href: '/conv', title: t('converterTitle'), desc: t('converterDesc'), anchor: 'iiif-converter' },
    { href: '/icc', title: t('comparisonTitle'), desc: t('comparisonDesc'), anchor: 'iiif-curation-comparison' },
    { href: '/map', title: t('mapTitle'), desc: t('mapDesc'), anchor: 'iiif-curation-map-search' },
  ];

  return (
    <main className="container mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{t('title')}</h1>
      <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-300">{t('description')}</p>
      <p className="mt-3 max-w-3xl rounded-md bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
        {t('note')}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            id={tool.anchor}
            className="block rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-500 hover:shadow-sm transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{tool.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('apiTitle')}</h2>
        <p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-300">{t('apiDesc')}</p>
        <pre className="mt-4 overflow-x-auto rounded-md bg-gray-100 dark:bg-gray-800 p-4 text-xs leading-relaxed">
{`GET /api/curation?u=<IIIF Manifest URI>      → Curation List (cr:Curation)
GET /api/collection?u=<IIIF Curation URI>    → IIIF Collection (sc:Collection)
GET /api/fetch?u=<URI>                       → CORS 中継（JSON のみ）`}
        </pre>
        <Link
          href="/api-docs"
          className="mt-5 inline-block rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-4 hover:border-blue-500 hover:shadow-sm transition"
        >
          <span className="block font-semibold text-gray-900 dark:text-gray-100">{tApi('navTitle')}</span>
          <span className="block text-sm text-gray-600 dark:text-gray-400">{tApi('navDesc')}</span>
        </Link>
      </section>
    </main>
  );
}

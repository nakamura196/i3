import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { Link } from '@/i18n/routing';
import { getPageMetadata } from '@/constants/metadata';

type Props = { params: Promise<{ locale: 'ja' | 'en' }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Converter' });
  return getPageMetadata(locale, { title: t('title'), description: t('description') });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Converter' });

  const cards = [
    { href: '/conv/convert2curation', title: t('toCurationTitle'), desc: t('toCurationDesc') },
    { href: '/conv/convert2manifest', title: t('toCollectionTitle'), desc: t('toCollectionDesc') },
  ];

  return (
    <PageLayout title={t('title')} description={t('description')} breadcrumbItems={[{ title: t('title') }]}>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-500 hover:shadow-sm transition"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{c.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{c.desc}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

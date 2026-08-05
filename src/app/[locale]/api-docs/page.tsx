import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import SwaggerUI from '@/components/page/apidocs/SwaggerUI';
import { getPageMetadata } from '@/constants/metadata';

type Props = { params: Promise<{ locale: 'ja' | 'en' }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ApiDocs' });
  return getPageMetadata(locale, { title: t('title'), description: t('description') });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ApiDocs' });

  return (
    <PageLayout
      title={t('title')}
      description={t('description')}
      breadcrumbItems={[{ title: t('title') }]}
      fluid
    >
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        {t('specHint')}{' '}
        <a
          href="/api/openapi"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          /api/openapi
        </a>
      </p>
      <SwaggerUI />
    </PageLayout>
  );
}

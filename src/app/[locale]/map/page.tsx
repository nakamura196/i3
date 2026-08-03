import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import MapSearch from '@/components/page/map/MapSearch';
import { getPageMetadata } from '@/constants/metadata';

type Props = { params: Promise<{ locale: 'ja' | 'en' }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MapSearch' });
  return getPageMetadata(locale, { title: t('title'), description: t('description') });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'MapSearch' });
  return (
    <PageLayout title={t('title')} description={t('description')} breadcrumbItems={[{ title: t('title') }]} fluid>
      <MapSearch />
    </PageLayout>
  );
}

import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import Converter from '@/components/page/conv/Converter';
import { getPageMetadata } from '@/constants/metadata';

type Props = { params: Promise<{ locale: 'ja' | 'en' }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Converter' });
  return getPageMetadata(locale, { title: `${t('toCollectionTitle')} | ${t('title')}` });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Converter' });

  return (
    <PageLayout
      title={t('toCollectionTitle')}
      description={t('toCollectionDesc')}
      breadcrumbItems={[{ title: t('title'), href: '/conv' }, { title: t('toCollectionTitle') }]}
    >
      <Converter direction="toCollection" />
    </PageLayout>
  );
}

import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const TOOL_LINKS = [
  { href: '/conv', key: 'converterTitle' as const },
  { href: '/icc', key: 'comparisonTitle' as const },
  { href: '/map', key: 'mapTitle' as const },
];

const DOC_LINKS = [{ href: '/api-docs', key: 'navTitle' as const }];

const EXTERNAL_LINKS = [
  { href: 'https://codh.rois.ac.jp/icp/', label: 'IIIF Curation Platform' },
  { href: 'http://codh.rois.ac.jp/iiif/curation/', label: 'Curation API 1.0 for IIIF' },
  { href: 'https://iiif.io/api/presentation/3.0/', label: 'IIIF Presentation API 3.0' },
  { href: 'https://github.com/nakamura196/i3', label: 'GitHub — nakamura196/i3' },
];

export default async function Footer() {
  const tCommon = await getTranslations('Common');
  const tHome = await getTranslations('Home');
  const tApi = await getTranslations('ApiDocs');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 pt-14 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {tCommon('title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{tHome('description')}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tools</h2>
            <ul className="space-y-2 text-sm">
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tHome(l.key)}
                  </Link>
                </li>
              ))}
              {DOC_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tApi(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Links</h2>
            <ul className="space-y-2 text-sm">
              {EXTERNAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {year} Satoru Nakamura — MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}

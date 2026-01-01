import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import Button from '@/shared/components/button';

export default function FilterActions({ report }: { report: string }) {
  const pathname = usePathname();
  const t = useTranslations('reports');

  const isAdmin = pathname.includes('/admin');

  return (
    <div className="flex items-center justify-end gap-4">
      <Link
        href={`/${isAdmin ? 'admin' : 'dashboard'}/reports${report}`}
        className="w-fit"
      >
        {t('clearFilters')}
      </Link>
      <Button className="w-fit">{t('applyFilters')}</Button>
    </div>
  );
}

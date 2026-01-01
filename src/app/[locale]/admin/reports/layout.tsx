import type { PropsWithChildren } from 'react';
import { getTranslations } from 'next-intl/server';

import PageTitle from '@/shared/components/page-title';
import NavigationBar from '@/features/reports/components/navigation-bar';

async function ReportsLayout({ children }: PropsWithChildren) {
  const t = await getTranslations('reports');

  return (
    <div>
      <section className="max-h-fit">
        <PageTitle title={t('title')} />
        <NavigationBar />
      </section>
      {children}
    </div>
  );
}

export default ReportsLayout;

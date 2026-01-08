import { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { getTranslations } from 'next-intl/server';

import PageTitle from '@/features/dashboard/components/page-title';
import NavigationBar from '@/features/reports/components/navigation-bar';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return {
    title: {
      default: t('reports.title'),
      template: `${t('reports.title')} | %s - ${t('root.title')}`,
    },
    description: t('root.description'),
  };
}

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

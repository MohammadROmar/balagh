import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ByStatusFilters from '@/features/reports/components/by-status-filter';
import ExportReport from '@/features/reports/components/export';
import { getReportData } from '@/features/reports/utils/get-report-data';
import { getGovermentalEntities } from '@/features/reports/utils/get-govermental-entities';
import type { FilterByStatus } from '@/features/reports/models/filters';
import type { TFunction } from '@/shared/models/tfunction';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return {
    title: `${t('reports.title')} | ${t('reports.byStatus')} - ${t('root.title')}`,
  };
}
type SearchParams = Record<string, string>;
type PageProps = { searchParams: Promise<SearchParams> };

export default async function ReportsByStatusPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const govermentalEntities = await getGovermentalEntities();

  const t = await getTranslations('reports');

  return (
    <>
      <section className="bg-secondary-background mt-6 rounded-2xl border border-gray-300 p-4 dark:border-gray-600">
        <h3 className="text-xl font-semibold capitalize">
          {t('filtersTitle')}
        </h3>
        <hr className="my-4 text-gray-300 dark:text-gray-600"></hr>
        <ByStatusFilters govermentalEntities={govermentalEntities} />
      </section>
      <section className="bg-secondary-background mt-6 rounded-2xl border border-gray-300 p-4 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold capitalize">
            {t('filteredBy')} {t('types.byStatus')}
          </h3>
          <ExportReport type="status" />
        </div>
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <DataChart t={t} searchParms={params} />
      </section>
    </>
  );
}

type DataChartProps = { t: TFunction<'reports'>; searchParms: SearchParams };

async function DataChart({ t, searchParms }: DataChartProps) {
  const data = await getReportData<FilterByStatus>(searchParms, 'status');

  if (data.length === 0) return <p className="text-center">{t('noData')}</p>;

  const tStatus = await getTranslations('complaintsPage.details.statuses');

  return (
    <ul className="space-y-2">
      {data.map((item) => {
        const percentage = item.percentageOfTotalComplaints.toFixed(2);

        return (
          <li key={item.status} className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">{tStatus(item.status)}</p>
              <p className="text-sm">
                {t('data.complaintCount')}:{' '}
                <span className="font-semibold">{item.complaintCount}</span>
              </p>
            </div>

            <p className="sr-only">{percentage}%</p>
            <div
              aria-hidden
              className="bg-primary-background relative h-10 w-full overflow-hidden rounded-full"
            >
              <div
                className={`bg-gradient relative h-full overflow-hidden rounded-full`}
                style={{ width: `${percentage}%` }}
              >
                <p className="absolute top-1/2 z-40 -translate-y-1/2 text-sm text-white ltr:left-4 rtl:right-4 dark:hidden">
                  {percentage}%
                </p>
              </div>
              <p className="absolute top-1/2 -translate-y-1/2 text-sm ltr:left-4 rtl:right-4">
                {percentage}%
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

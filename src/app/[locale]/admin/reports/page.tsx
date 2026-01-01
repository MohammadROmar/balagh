import { getTranslations } from 'next-intl/server';

import ByStatusFilters from '@/features/reports/components/by-status-filter';
import { getReportData } from '@/features/reports/utils/get-report-data';
import { getGovermentalEntities } from '@/features/reports/utils/get-govermental-entities';
import type { FilterByStatus } from '@/features/reports/models/filters';
import type { TFunction } from '@/shared/models/tfunction';

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
        <h3 className="text-xl font-semibold capitalize">
          {t('filteredBy')} {t('types.byStatus')}
        </h3>
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <DataChart t={t} searchParms={params} />
      </section>
    </>
  );
}

type DataChartProps = { t: TFunction<'reports'>; searchParms: SearchParams };

async function DataChart({ t, searchParms }: DataChartProps) {
  const data = await getReportData<FilterByStatus>(searchParms, 'status');

  if (data.length === 0) return <p className="text-center">No data found</p>;

  return (
    <ul className="space-y-2">
      {data.map((item) => {
        const percentage = item.percentageOfTotalComplaints.toFixed(2);

        return (
          <li key={item.status} className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">{item.status}</p>
              <p className="text-sm">
                {t('data.complaintCount')}:{' '}
                <span className="text-emerald-green">
                  {item.complaintCount}
                </span>
              </p>
            </div>
            <div className="bg-primary-background h-10 w-full overflow-hidden rounded-full">
              <div
                className={`bg-gradient h-full rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

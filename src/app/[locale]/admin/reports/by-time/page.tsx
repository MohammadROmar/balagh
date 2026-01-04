import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import ReportDataListItem from '@/features/reports/components/report-data-list-item';
import ByTimeFilters from '@/features/reports/components/by-time-filter';
import ExportReport from '@/features/reports/components/export';
import { getReportData } from '@/features/reports/utils/get-report-data';
import { getGovermentalEntities } from '@/features/reports/utils/get-govermental-entities';
import type { TFunction } from '@/shared/models/tfunction';
import type { FilterByTime } from '@/features/reports/models/filters';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.reports');

  return { title: t('byTime') };
}

type SearchParams = Record<string, string>;
type PageProps = { searchParams: Promise<SearchParams> };

export default async function ReportsByTimePage({ searchParams }: PageProps) {
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
        <ByTimeFilters govermentalEntities={govermentalEntities} />
      </section>
      <section className="bg-secondary-background mt-6 rounded-2xl border border-gray-300 p-4 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold capitalize">
            {t('filteredBy')} {t('types.byTime')}
          </h3>
          <ExportReport type="by-time" />
        </div>
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <DataChart t={t} searchParms={params} />
      </section>
    </>
  );
}

type DataChartProps = { t: TFunction<'reports'>; searchParms: SearchParams };

async function DataChart({ t, searchParms }: DataChartProps) {
  const locale = await getLocale();

  const data = await getReportData<FilterByTime>(searchParms, 'by-time');

  if (data.length === 0) return <p className="text-center">{t('noData')}</p>;

  return (
    <ul className="space-y-2">
      {data.map((item) => {
        const title = new Date(item.year, item.month).toLocaleDateString(
          locale,
          {
            month: 'long',
            year: 'numeric',
          },
        );

        return (
          <ReportDataListItem
            key={`${item.year}-${item.month}`}
            title={title}
            complaintCount={item.complaintCount}
            percentage={item.percentageOfTotalComplaints}
            t={t}
          />
        );
      })}
    </ul>
  );
}

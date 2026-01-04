import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ByGovEntityFilters from '@/features/reports/components/by-gov-entity-filter';
import ReportDataListItem from '@/features/reports/components/report-data-list-item';
import ExportReport from '@/features/reports/components/export';
import { getReportData } from '@/features/reports/utils/get-report-data';
import type { FilterByGovEntity } from '@/features/reports/models/filters';
import type { TFunction } from '@/shared/models/tfunction';

type SearchParams = Record<string, string>;
type PageProps = { searchParams: Promise<SearchParams> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.reports');

  return { title: t('byGovEntity') };
}

export default async function ReportsByGovEntityPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const t = await getTranslations('reports');

  return (
    <>
      <section className="bg-secondary-background mt-6 rounded-2xl border border-gray-300 p-4 dark:border-gray-600">
        <h3 className="text-xl font-semibold capitalize">
          {t('filtersTitle')}
        </h3>
        <hr className="my-4 text-gray-300 dark:text-gray-600"></hr>
        <ByGovEntityFilters />
      </section>
      <section className="bg-secondary-background mt-6 rounded-2xl border border-gray-300 p-4 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold capitalize">
            {t('filteredBy')} {t('types.byGovEntity')}
          </h3>
          <ExportReport type="by-gov-entity" />
        </div>
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <DataChart t={t} searchParms={params} />
      </section>
    </>
  );
}

type DataChartProps = { t: TFunction<'reports'>; searchParms: SearchParams };

async function DataChart({ t, searchParms }: DataChartProps) {
  const data = await getReportData<FilterByGovEntity>(
    searchParms,
    'by-gov-entity',
  );

  if (data.length === 0) return <p className="text-center">{t('noData')}</p>;

  return (
    <ul className="space-y-2">
      {data.map((item) => (
        <ReportDataListItem
          key={item.govermentalEntityId}
          title={item.govermentalEntityName}
          complaintCount={item.complaintCount}
          percentage={item.percentageOfTotalComplaints}
          t={t}
        />
      ))}
    </ul>
  );
}

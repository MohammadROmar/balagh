'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import Download from '@/assets/icons/download';

type ExportReportProps = { type: string };

function ExportReport({ type }: ExportReportProps) {
  const searchParams = useSearchParams();
  const t = useTranslations('reports');

  const searchParamsStr = new URLSearchParams(searchParams).toString();
  const downloadURL = `/api/reports/download?type=${type}&${searchParamsStr}`;

  return (
    <a
      href={downloadURL}
      download
      aria-label={t('downloadReport')}
      title={t('downloadReport')}
      className="button flex w-fit items-center gap-2 text-base font-normal"
    >
      <Download className="size-5" />
    </a>
  );
}

export default ExportReport;

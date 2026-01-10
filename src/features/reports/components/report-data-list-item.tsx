import { splitOnUppercase } from '@/features/complaints/utils/split-on-uppercase';
import type { TFunction } from '@/shared/models/tfunction';

type Props = {
  title: string;
  complaintCount: number;
  percentage: number;
  t: TFunction<'reports'>;
};

async function ReportDataListItem({
  title,
  complaintCount,
  percentage,
  t,
}: Props) {
  const percentageStr = percentage.toFixed(2);

  return (
    <li className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="font-medium">{splitOnUppercase(title)}</p>
        <p className="text-sm">
          {t('data.complaintCount')}:{' '}
          <span className="text-emerald-green">{complaintCount}</span>
        </p>
      </div>

      <p className="sr-only">{percentageStr}%</p>
      <div
        aria-hidden
        className="bg-primary-background relative h-10 w-full overflow-hidden rounded-full"
      >
        <div
          className={`bg-gradient relative h-full overflow-hidden rounded-full`}
          style={{ width: `${percentageStr}%` }}
        >
          <p className="absolute top-1/2 z-40 -translate-y-1/2 text-sm text-white ltr:left-4 rtl:right-4 dark:hidden">
            {percentageStr}%
          </p>
        </div>
        <p className="absolute top-1/2 -translate-y-1/2 text-sm ltr:left-4 rtl:right-4">
          {percentageStr}%
        </p>
      </div>
    </li>
  );
}

export default ReportDataListItem;

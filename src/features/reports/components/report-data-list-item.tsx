import { TFunction } from '@/shared/models/tfunction';

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
        <p className="font-medium">{title}</p>
        <p className="text-sm">
          {t('data.complaintCount')}:{' '}
          <span className="text-emerald-green">{complaintCount}</span>
        </p>
      </div>
      <div className="bg-primary-background h-8 w-full overflow-hidden rounded-full">
        <div
          className={`bg-gradient h-full rounded-full`}
          style={{ width: `${percentageStr}%` }}
        />
      </div>
    </li>
  );
}

export default ReportDataListItem;

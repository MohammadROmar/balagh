import clsx from 'clsx';

import { TFunction } from '@/shared/models/tfunction';

type ComplaintStatusProps = {
  status: string;
  t: TFunction<'complaintsPage.details'>;
};

function getStatusInfo(status: string) {
  const statusStyles: { [key: string]: { text: string; bg: string } } = {
    New: { text: 'text-info', bg: 'bg-info-bg' },
    InProcessing: { text: 'text-warning', bg: 'bg-warning-bg' },
    Done: { text: 'text-success', bg: 'bg-success-bg' },
    Declined: { text: 'text-error', bg: 'bg-error-bg' },
  };

  return statusStyles[status];
}

function ComplaintStatus({ status, t }: ComplaintStatusProps) {
  const statusStyles = getStatusInfo(status);

  return (
    <p
      className={clsx(
        'rounded-xl px-2 py-1 text-xs',
        statusStyles.text,
        statusStyles.bg,
      )}
    >
      {t(`statuses.${status}` as any)}
    </p>
  );
}

export default ComplaintStatus;

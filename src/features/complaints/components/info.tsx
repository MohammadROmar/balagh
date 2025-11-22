import { getLocale } from 'next-intl/server';
import type { ElementType } from 'react';

import InfoIcon from '@/assets/icons/info';
import UserIcon from '@/assets/icons/user';
import StatusIcon from '@/assets/icons/status';
import LocationIcon from '@/assets/icons/location';
import DescriptionIcon from '@/assets/icons/description';
import GovernmentIcon from '@/assets/icons/government';
import DateIcon from '@/assets/icons/date';
import ComplaintDetailsContainer from './details-container';
import LockIcon from '@/assets/icons/lock';
import { formatDate } from '@/shared/utils/format-date';
import type { Complaint } from '../models/complaint';
import type { TFunction } from '@/shared/models/tfunction';

type Props = { complaint: Complaint; t: TFunction<'complaintsPage.details'> };
type DetailProps = { title: string; value: string; icon: ElementType };

async function ComplaintInfo({ complaint, t }: Props) {
  const locale = await getLocale();

  return (
    <ComplaintDetailsContainer title={t('info')} icon={InfoIcon}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 divide-x divide-gray-300 dark:divide-gray-600">
          <Detail
            title={t('user')}
            value={complaint.userName}
            icon={UserIcon}
          />
          <Detail
            title={t('date')}
            value={formatDate(new Date(complaint.createdAt), locale)}
            icon={DateIcon}
          />
        </div>

        <hr className="text-gray-300 dark:text-gray-600" />
        <div className="grid grid-cols-2 gap-4 divide-x divide-gray-300 dark:divide-gray-600">
          <Detail
            title={t('status')}
            value={t(`statuses.${complaint.status}` as any)}
            icon={StatusIcon}
          />
          <Detail
            title={t('lockStatus')}
            value={
              complaint.isLocked
                ? `${t('lockedBy')} ${complaint.lockedByUserName}`
                : t('unlocked')
            }
            icon={LockIcon}
          />
        </div>

        <hr className="text-gray-300 dark:text-gray-600" />
        <div className="grid grid-cols-2 gap-4 divide-x divide-gray-300 dark:divide-gray-600">
          <Detail
            title={t('governmentalEntity')}
            value={complaint.governmentalEntityId.toString()}
            icon={GovernmentIcon}
          />
          <Detail
            title={t('location')}
            value={complaint.location}
            icon={LocationIcon}
          />
        </div>

        <hr className="text-gray-300 dark:text-gray-600" />

        <Detail
          title={t('description')}
          value={complaint.description}
          icon={DescriptionIcon}
        />
      </div>
    </ComplaintDetailsContainer>
  );
}

function Detail({ title, value, icon: Icon }: DetailProps) {
  return (
    <div className="space-y-1">
      <div className="text-secondary flex items-center gap-1">
        <Icon className="size-3" />
        <h4 className="text-sm">{title}</h4>
      </div>
      <p>{value}</p>
    </div>
  );
}

export default ComplaintInfo;

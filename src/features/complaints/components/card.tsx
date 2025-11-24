import { getTranslations } from 'next-intl/server';
import type { ElementType } from 'react';

import ComplaintIcon from '@/assets/icons/complaint';
import UserIcon from '@/assets/icons/user';
import LocationIcon from '@/assets/icons/location';
import DescriptionIcon from '@/assets/icons/description';
import type { Complaint } from '../models/complaint';
import ComplaintStatus from './status';
import LockIcon from '@/assets/icons/lock';
import AuthLink from '@/features/auth/components/link';

type ComplaintCardProps = { complaint: Complaint };
type CardTextProps = { title: string; value: string; icon: ElementType };

async function ComplaintCard({ complaint }: ComplaintCardProps) {
  const t = await getTranslations('complaintsPage.details');

  return (
    <li className="bg-secondary-background grid grid-rows-[auto_1fr] overflow-x-hidden rounded-xl border border-gray-300 p-4 shadow-sm dark:border-gray-600">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3>
            <CardText
              title={t('complaintID')}
              value={complaint.id.toString()}
              icon={ComplaintIcon}
            />
          </h3>

          <ComplaintStatus status={complaint.status} t={t} />
        </div>
        <p>
          <CardText
            title={t('user')}
            value={complaint.userName}
            icon={UserIcon}
          />
        </p>
        <p>
          <CardText
            title={t('location')}
            value={complaint.location}
            icon={LocationIcon}
          />
        </p>
        <p className="max-w-full overflow-hidden">
          <CardText
            title={t('description')}
            value={complaint.description}
            icon={DescriptionIcon}
          />
        </p>
        <p className="max-w-full overflow-hidden">
          <CardText
            title={t('lockStatus')}
            value={
              complaint.isLocked
                ? `${t('lockedBy')} ${complaint.lockedByUserName}`
                : t('unlocked')
            }
            icon={LockIcon}
          />
        </p>
      </div>

      <div className="flex flex-col items-end justify-end">
        <div className="mt-4 h-fit w-full border-t border-gray-300 pt-4 dark:border-gray-600">
          <AuthLink
            href={`/complaints/${complaint.id}`}
            className="button flex w-full items-center justify-center"
          >
            {t('viewDetails')}
          </AuthLink>
        </div>
      </div>
    </li>
  );
}

function CardText({ title, value, icon: Icon }: CardTextProps) {
  return (
    <>
      <span className="text-secondary flex items-center gap-1">
        <span aria-hidden>
          <Icon className="size-4" />
        </span>
        <span className="text-sm">{title}</span>
      </span>
      <span className="line-clamp-2 text-balance wrap-break-word break-all">
        {value}
      </span>
    </>
  );
}

export default ComplaintCard;

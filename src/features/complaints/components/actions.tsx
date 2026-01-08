import { Suspense } from 'react';

import ComplaintDetailsContainer from './details-container';
import ActionsIcon from '@/assets/icons/actions';
import AuthorizedActions from './authorized-actions';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import type { Complaint } from '../models/complaint';

type ComplaintActionsProps = { title: string; complaint: Complaint };

function ComplaintActions({ title, complaint }: ComplaintActionsProps) {
  return (
    <ComplaintDetailsContainer title={title} icon={ActionsIcon}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <LoadingIndicator className="text-emerald-green w-12" />
          </div>
        }
      >
        <AuthorizedActions complaint={complaint} />
      </Suspense>
    </ComplaintDetailsContainer>
  );
}

export default ComplaintActions;

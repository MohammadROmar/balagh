import { Suspense } from 'react';
import ComplaintDetailsContainer from './details-container';
import ActionsIcon from '@/assets/icons/actions';
import type { Complaint } from '../models/complaint';
import AuthorizedActions from './authorized-actions';
import LoadingIndicator from '@/assets/icons/loading-indicator';

type ComplaintActionsProps = { title: string; complaint: Complaint };

function ComplaintActions({ title, complaint }: ComplaintActionsProps) {
  return (
    <ComplaintDetailsContainer title={title} icon={ActionsIcon}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <LoadingIndicator className="text-emerald-green w-1/4" />
          </div>
        }
      >
        <AuthorizedActions complaint={complaint} />
      </Suspense>
    </ComplaintDetailsContainer>
  );
}

export default ComplaintActions;

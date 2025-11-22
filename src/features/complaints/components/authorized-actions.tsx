import { getSession } from '@/features/auth/api/get-session';
import ChangeComplaintStatus from './change-status';
import RequestComplaintInfo from './request-info';
import AddNote from './add-note';
import ProceedComplaint from './proceed';
import type { Complaint } from '../models/complaint';

type AuthorizedActionsProps = { complaint: Complaint };

async function AuthorizedActions({ complaint }: AuthorizedActionsProps) {
  const user = await getSession();

  if (!user) {
    return null;
  }

  if (complaint.lockedBy === user.id) {
    return (
      <>
        <ChangeComplaintStatus
          id={complaint.id.toString()}
          status={complaint.status}
        />
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <AddNote id={complaint.id.toString()} />
        <hr className="my-4 text-gray-300 dark:text-gray-600" />
        <RequestComplaintInfo id={complaint.id.toString()} />
      </>
    );
  }

  return <ProceedComplaint complaint={complaint} />;
}

export default AuthorizedActions;

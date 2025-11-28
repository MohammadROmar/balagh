import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import PageTitle from '@/shared/components/page-title';
import ComplaintInfo from '@/features/complaints/components/info';
import ComplaintFiles from '@/features/complaints/components/files';
import ComplaintNotes from '@/features/complaints/components/notes';
import ComplaintActions from '@/features/complaints/components/actions';
import ComaplintHistory from '@/features/complaints/components/histories';
import { get } from '@/shared/api/get';
import type { Complaint } from '@/features/complaints/models/complaint';

async function ComplaintDetails({ id }: { id?: String }) {
  const data = await get<Complaint>(
    `/api/Complaints/GetComplaintById/${id}?includeNotes=true`,
    {
      next: { tags: [`complaint-${id}`] },
    },
  );

  if (data.message !== 'success') {
    return notFound();
  }

  const complaint = data.data;

  const t = await getTranslations('complaintsPage.details');

  return (
    <div className="space-y-8">
      <section>
        <PageTitle title={t('title')} />
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ComplaintInfo t={t} complaint={complaint} />
          <ComplaintFiles complaintFiles={complaint.complaintFiles} />
          {complaint.notes.length > 0 && (
            <ComplaintNotes t={t} notes={complaint.notes} />
          )}
          {complaint.histories.length > 0 && (
            <ComaplintHistory t={t} histories={complaint.histories} />
          )}
        </div>

        <ComplaintActions title={t('actions')} complaint={complaint} />
      </div>
    </div>
  );
}

export default ComplaintDetails;

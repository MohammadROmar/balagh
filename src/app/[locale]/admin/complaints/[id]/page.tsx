import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import PageTitle from '@/shared/components/page-title';
import ComplaintInfo from '@/features/complaints/components/info';
import ComplaintFiles from '@/features/complaints/components/files';
import ComplaintInternalNotes from '@/features/complaints/components/internal-notes';
import { get } from '@/shared/api/get';
import type { Complaint } from '@/features/complaints/models/complaint';

type Props = { params: Promise<{ id: string }> };

async function ComplaintDetailsPage({ params }: Props) {
  const { id } = await params;

  const data = await get<Complaint>(`/api/Complaints/GetComplaintById/${id}`);

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

      <ComplaintInfo t={t} complaint={complaint} />
      <ComplaintFiles complaintFiles={complaint.complaintFiles} />
      <ComplaintInternalNotes id={id} />
    </div>
  );
}

export default ComplaintDetailsPage;

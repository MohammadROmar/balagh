import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import PageTitle from '@/shared/components/page-title';
import ComplaintInfo from '@/features/complaints/components/info';
import type { Complaint } from '@/features/complaints/models/complaint';
import ComplaintFiles from '@/features/complaints/components/files';

type Props = { params: Promise<{ id: string }> };

async function ComplaintDetailsPage({ params }: Props) {
  const { id } = await params;

  const accessToken = (await cookies()).get('access_token')?.value;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/Complaints/GetComplaintById/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const complaint = (await response.json()) as Complaint;

  const t = await getTranslations('complaintsPage.details');

  return (
    <div className="space-y-8">
      <section>
        <PageTitle title={t('title')} />
      </section>

      <ComplaintInfo t={t} complaint={complaint} />
      <ComplaintFiles
        title={t('files')}
        complaintFiles={complaint.complaintFiles}
      />
    </div>
  );
}

export default ComplaintDetailsPage;

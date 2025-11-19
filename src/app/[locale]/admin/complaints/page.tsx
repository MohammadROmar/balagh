import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';

import ComplaintCard from '@/features/complaints/components/card';
import PageTitle from '@/shared/components/page-title';
import type { Complaint } from '@/features/complaints/models/complaint';
import Pagination from '@/shared/components/pagination';

type Complaints = {
  items: Complaint[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

type Props = { searchParams: Promise<{ page?: string }> };

export default async function ComplaintsPage({ searchParams }: Props) {
  const { page } = await searchParams;

  const accessToken = (await cookies()).get('access_token')?.value;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/Complaints/GetAllComplaints?pageNum=${page ? page : 1}&pageSize=6`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const t = await getTranslations('complaintsPage');

  const complaints = (await response.json()) as Complaints;

  return (
    <section>
      <PageTitle title={t('title')} />

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {complaints.items.map((complaint) => (
          <ComplaintCard
            key={`complaint-card-${complaint.id}`}
            complaint={complaint}
          />
        ))}
      </ul>

      <div className="mt-4 flex w-full items-center justify-center">
        <Pagination
          currentPage={complaints.pageNumber}
          totalPages={complaints.totalPages}
          maxButtons={6}
        />
      </div>
    </section>
  );
}

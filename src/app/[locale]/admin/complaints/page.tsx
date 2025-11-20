import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import ComplaintCard from '@/features/complaints/components/card';
import PageTitle from '@/shared/components/page-title';
import Pagination from '@/shared/components/pagination';
import { get } from '@/shared/api/get';
import type { Complaint } from '@/features/complaints/models/complaint';

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

  const data = await get<Complaints>(
    `/api/Complaints/GetAllComplaints?pageNum=${page ? page : 1}&pageSize=6`,
  );

  if (data.message !== 'success') {
    return notFound();
  }

  const t = await getTranslations('complaintsPage');

  const complaints = data.data;

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

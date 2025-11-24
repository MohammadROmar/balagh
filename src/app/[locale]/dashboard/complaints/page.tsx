import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import AllComplaints from '@/features/complaints/components/all-complaints';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('complaints.allComplaintsTitle') };
}

type Props = { searchParams: Promise<{ page?: string }> };

export default async function ComplaintsPage({ searchParams }: Props) {
  const { page } = await searchParams;

  return <AllComplaints page={page} />;
}

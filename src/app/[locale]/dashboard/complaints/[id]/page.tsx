import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ComplaintDetails from '@/features/complaints/components/details';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('complaints.complaintDetailsTitle') };
}

type Props = { params: Promise<{ id: string }> };

async function ComplaintDetailsPage({ params }: Props) {
  const { id } = await params;

  return <ComplaintDetails id={id} />;
}

export default ComplaintDetailsPage;

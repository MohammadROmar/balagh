import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('admin') };
}

export default function AdminPage() {
  return <div>AdminPage</div>;
}

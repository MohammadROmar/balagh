import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('dashboard') };
}

export default async function DashboardPage() {
  const isAuthenticated = !!(await cookies()).get('access_token')?.value;

  if (!isAuthenticated) {
    const locale = await getLocale();

    redirect(`/${locale}`);
  }

  return <div>DashboardPage</div>;
}

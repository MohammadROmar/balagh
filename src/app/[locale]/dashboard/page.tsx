import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function DashboardPage() {
  const isAuthenticated = !!(await cookies()).get('access_token')?.value;

  if (!isAuthenticated) {
    const locale = await getLocale();

    redirect(`/${locale}`);
  }

  return <div>DashboardPage</div>;
}

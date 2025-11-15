import { Toaster } from 'sonner';
import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

import Sidebar from '@/shared/components/sidebar';
import { redirect } from '@/i18n/navigation';
import type { User } from '@/config/models/user';

async function AdminLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('access_token')?.value;

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/api/users/current`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const { role } = (await response.json()) as User;
  if (role !== 'Administrator') {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    const locale = await getLocale();
    redirect({ href: '/', locale });
  }

  return (
    <div className="h-screen max-h-screen grid-cols-[auto_auto_1fr] lg:grid">
      <Toaster />
      <Sidebar role="Administrator" />
      <main className="m-auto grid size-full max-w-5xl overflow-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;

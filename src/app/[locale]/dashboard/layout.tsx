import { getLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

import AuthLayout from '@/features/auth/components/auth-layout';
import SessionCleanup from '@/features/auth/components/session-cleanup';
import { redirect } from '@/i18n/navigation';
import { getSession } from '@/features/auth/api/get-session';

export const dynamic = 'force-dynamic';

async function EmployeeLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();

  const user = await getSession();

  if (user && user.role !== 'Employee') {
    redirect({ href: '/admin', locale });
  }

  return (
    <>
      <SessionCleanup hasUser={!!user} />
      {user && <AuthLayout role="Employee">{children}</AuthLayout>}
    </>
  );
}

export default EmployeeLayout;

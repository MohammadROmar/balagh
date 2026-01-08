import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

import SidebarContextProvider from '@/features/dashboard/store/sidebar';
import Sidebar from '@/features/dashboard/components/sidebar';
import Header from '@/features/dashboard/components/header';
import RefreshTokens from '@/features/auth/components/refresh-tokens';

type AuthLayoutProps = {
  role: 'Administrator' | 'Employee';
} & PropsWithChildren;

function AuthLayout({ role, children }: AuthLayoutProps) {
  const isAdmin = role === 'Administrator';

  return (
    <SidebarContextProvider>
      <div
        className={clsx(
          'min-h-screen lg:grid',
          isAdmin && 'grid-cols-[auto_auto_auto_1fr]',
        )}
      >
        <Toaster
          position="top-center"
          className="rtl:font-kufi! ltr:font-open-sans!"
        />
        <div id="modals" />
        {isAdmin && <Sidebar role={role} />}
        <div className="grid size-full grid-rows-[auto_1fr]">
          <Header />
          <main
            className={clsx(
              'm-auto grid size-full overflow-auto p-4 lg:p-8',
              isAdmin && 'max-w-6xl',
            )}
          >
            {children}
          </main>
        </div>

        <RefreshTokens />
      </div>
    </SidebarContextProvider>
  );
}

export default AuthLayout;

import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';

import SidebarContextProvider from '@/shared/store/sidebar';
import Sidebar from '@/shared/components/sidebar';
import Header from '@/shared/components/header';
import RefreshTokens from '@/features/auth/components/refresh-tokens';

type AuthLayoutProps = {
  role: 'Administrator' | 'Employee';
} & PropsWithChildren;

function AuthLayout({ role, children }: AuthLayoutProps) {
  return (
    <SidebarContextProvider>
      <div className="min-h-screen grid-cols-[auto_auto_auto_1fr] lg:grid">
        <Toaster className="rtl:font-kufi! ltr:font-open-sans!" />
        <div id="modals" />
        <Sidebar role={role} />
        <div className="grid size-full grid-rows-[auto_1fr]">
          <Header />
          <main className="m-auto grid size-full max-w-5xl overflow-auto p-4 lg:p-8">
            {children}
          </main>
        </div>

        <RefreshTokens />
      </div>
    </SidebarContextProvider>
  );
}

export default AuthLayout;

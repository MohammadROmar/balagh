import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

import SidebarContextProvider from './sidebar';

function Providers({ children }: PropsWithChildren) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <SidebarContextProvider>{children}</SidebarContextProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

export default Providers;

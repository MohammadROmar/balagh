import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

function Providers({ children }: PropsWithChildren) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

export default Providers;

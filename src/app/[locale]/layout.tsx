import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { hasLocale, type Locale } from 'next-intl';
import type { PropsWithChildren } from 'react';

import Providers from '@/shared/store/providers';
import { routing } from '@/i18n/routing';
import { fontVariables } from '@/config/core/fonts';
import './globals.css';

type LocaleLayoutProps = {
  params: Promise<{ locale: Locale }>;
} & PropsWithChildren;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata.root');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function LocaleLayout({ params, children }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${fontVariables} ${locale === 'en' ? 'font-open-sans' : 'font-kufi'} selection:bg-emerald-green text-body bg-primary-background min-h-screen antialiased selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default LocaleLayout;

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  localePrefix: 'always',
  defaultLocale: 'ar',
});

export type Locale = (typeof routing.locales)[number];

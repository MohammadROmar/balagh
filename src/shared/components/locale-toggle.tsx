'use client';

import { useLocale, type Locale } from 'next-intl';
import clsx from 'clsx';

import GlobeIcon from '@/assets/icons/globe';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const activeLocale = useLocale();

  function changeLocale(locale: Locale) {
    router.replace({ pathname }, { locale });
  }

  return (
    <div className="bg-secondary-background text-secondary flex items-center gap-2 rounded-2xl px-2 py-1 text-sm">
      <GlobeIcon className="size-4" />

      <ul className="flex gap-1">
        {routing.locales.map((locale) => (
          <li
            key={locale}
            className={clsx(
              'rounded-md px-2 py-1',
              locale === activeLocale && 'bg-primary-background shadow-sm',
            )}
          >
            <button
              onClick={() => changeLocale(locale)}
              className={clsx(
                'cursor-pointer leading-none font-medium hover:text-black hover:dark:text-white',
                locale === activeLocale && 'text-heading',
              )}
            >
              {locale.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

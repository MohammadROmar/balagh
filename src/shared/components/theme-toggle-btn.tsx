'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import SunIcon from '@/assets/icons/sun';
import MoonIcon from '@/assets/icons/moon';

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const t = useTranslations('accessibility.theme-toggle');

  const isDark = resolvedTheme === 'dark';

  function handleThemeChange() {
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <button
      onClick={handleThemeChange}
      aria-label={t(isDark ? 'light' : 'dark')}
      title={t(isDark ? 'light' : 'dark')}
      className={clsx(
        'flex size-full cursor-pointer items-center justify-center p-1 transition-transform duration-500',
        isDark ? 'rotate-180' : 'rotate-90',
      )}
    >
      {isDark ? (
        <SunIcon aria-hidden className="size-4 shrink-0 md:size-5" />
      ) : (
        <MoonIcon
          aria-hidden
          className="size-4 shrink-0 -rotate-90 md:size-5"
        />
      )}
    </button>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import SunIcon from '@/assets/icons/sun';
import MoonIcon from '@/assets/icons/moon';
import LoadingSpinner from '@/assets/icons/loading-spinner';

export default function ThemeToggle() {
  const [didMount, setDidMount] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const t = useTranslations('accessibility.theme-toggle');

  const isDark = resolvedTheme === 'dark';

  useEffect(() => setDidMount(true), []);

  function handleThemeChange() {
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <div className="bg-secondary-background text-secondary flex size-9 items-center justify-center rounded-2xl hover:bg-gray-300 hover:dark:bg-gray-600">
      {didMount ? (
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
      ) : (
        <LoadingSpinner className="size-4 animate-spin md:size-5" />
      )}
    </div>
  );
}

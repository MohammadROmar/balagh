'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import AuthLink from '@/features/auth/components/link';
import status from '@/assets/icons/status';
import government from '@/assets/icons/government';
import date from '@/assets/icons/date';

export default function NavigationBar() {
  const pathname = usePathname();
  const t = useTranslations('reports.types');

  const navList = useMemo(
    () => [
      { label: t('byStatus'), icon: status, to: '' },
      { label: t('byGovEntity'), icon: government, to: 'by-gov-entity' },
      { label: t('byTime'), icon: date, to: 'by-time' },
    ],
    [],
  );

  const segments = pathname.split('/').filter(Boolean);
  const activeSegment = segments[segments.length - 1];

  return (
    <nav className="mt-6 max-w-[calc(100vw-2rem)] overflow-x-auto border-b border-gray-300 dark:border-gray-600">
      <ul className="flex items-center gap-4 max-sm:text-sm md:gap-8">
        {navList.map((item) => {
          const isActive =
            item.to === activeSegment ||
            (activeSegment === 'reports' && item.to === '');

          return (
            <li
              key={item.to}
              className={clsx(
                'text-secondary border-b-3 border-transparent pb-1 text-nowrap',
                isActive && 'border-emerald-green! text-current!',
              )}
            >
              <AuthLink
                href={`/reports/${item.to}`}
                className="flex items-center gap-2"
              >
                <item.icon className="hidden size-4 md:block" />
                <span>{item.label}</span>
              </AuthLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

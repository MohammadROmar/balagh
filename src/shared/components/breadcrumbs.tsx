'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const segments = pathname.split('/').filter(Boolean);

  return (
    <ol className="text-secondary flex flex-wrap text-sm">
      {segments.map((segment, i) => {
        const isLast = i === segments.length - 1;

        const href = `/${segments.slice(0, i + 1).join('/')}`;
        const label = t.has(segment as any) ? t(segment as any) : segment;

        return (
          <li key={segment} className="flex">
            <Link href={href} className="underline underline-offset-2">
              {label}
            </Link>
            {!isLast && (
              <span aria-hidden className="px-3 sm:px-4">
                /
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

type SidebarLinkProps = { label: string; href: string; icon: ReactNode };

function SidebarLink({ label, href, icon }: SidebarLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li key={href}>
      <Link
        href={href}
        className={clsx(
          'button flex items-center gap-2',
          !isActive && 'bg-none font-normal text-current',
        )}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
}

export default SidebarLink;

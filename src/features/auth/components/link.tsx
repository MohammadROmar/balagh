'use client';

import { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

type AuthLinkProps = LinkProps & PropsWithChildren & { className?: string };

export default function AuthLink({ children, ...props }: AuthLinkProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');
  const href = `${isAdmin ? '/admin' : '/dashboard'}${props.href}`;

  return (
    <Link {...props} locale={locale} href={href}>
      {children}
    </Link>
  );
}

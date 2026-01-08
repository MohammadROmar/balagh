'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { usePathname } from '@/i18n/navigation';
import Logout from '@/features/auth/components/logout';
import HamburgerMenuBtn from './hamburger-menu-btn';
import logoImg from '@/assets/images/logo.png';
import ThemeToggle from './theme-toggle';
import LocaleToggle from './locale-toggle';

export default function HeaderLogo() {
  const t = useTranslations();
  const pathname = usePathname();

  const isAdmin = pathname.includes('/admin');

  return (
    <div
      className={clsx(
        'flex h-min items-center gap-2 py-4 lg:select-none',
        isAdmin && 'lg:opacity-0',
      )}
    >
      <div className="relative size-7">
        <Image
          src={logoImg}
          alt=""
          aria-labelledby="header-title"
          aria-hidden
          fill
          sizes="28px"
          className="object-contain object-center"
        />
      </div>
      <h1
        id="header-title"
        className={clsx('text-2xl font-bold', !isAdmin && 'max-md:sr-only')}
      >
        {t('metadata.root.title')}
      </h1>
    </div>
  );
}

export function HeaderTail() {
  const pathname = usePathname();

  const isAdmin = pathname.includes('/admin');

  let component = <Logout textStyles="hidden md:block" />;

  if (isAdmin) component = <HamburgerMenuBtn />;

  return (
    <>
      <div
        className={clsx('flex items-center gap-2', isAdmin && 'max-lg:hidden')}
      >
        <ThemeToggle />
        <LocaleToggle />
      </div>

      {component}
    </>
  );
}

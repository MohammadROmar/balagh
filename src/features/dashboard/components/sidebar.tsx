'use client';

import Image from 'next/image';
import { useEffect, useMemo, useCallback, memo } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useSidebarContext } from '../store/sidebar';
import { useScreenSize } from '@/shared/hooks/use-screen-size';
import { useScrollLock } from '@/shared/hooks/use-scroll-lock';
import SidebarLink from './sidebar-link';
import Logout from '@/features/auth/components/logout';
import ThemeToggle from '@/shared/components/theme-toggle';
import LocaleToggle from '@/shared/components/locale-toggle';
import { CloseMenu } from './hamburger-menu-btn';
import { getSidebarTabs } from '../utils/get-sidebar-tabs';
import logoImg from '@/assets/images/logo.png';
import type { TFunction } from '@/shared/models/tfunction';

type SidebarProps = { role: 'Administrator' | 'Employee' };
type OnClose = { onClose: () => void };
type SidebarHeaderProps = { title: string; isOpen: boolean } & OnClose;
type SidebarNavigationProps = SidebarProps &
  OnClose & { t: TFunction<'sidebar'> };

function Sidebar({ role }: SidebarProps) {
  const t = useTranslations('sidebar');

  const { isOpen, setIsOpen } = useSidebarContext();
  const { width } = useScreenSize();
  const { isLocked, lock, unlock } = useScrollLock({ autoLock: false });

  const handleClose = useCallback(() => {
    unlock();
    setIsOpen(false);
  }, [unlock, setIsOpen]);

  useEffect(() => {
    if ((isOpen || isLocked) && width >= 1024) {
      handleClose();
    } else if (isOpen && !isLocked && width < 1024) {
      lock();
    }
  }, [isOpen, width, lock, isLocked, unlock, handleClose]);

  return (
    <>
      {isOpen && <Backdrop onClose={handleClose} />}

      <aside
        id="sidebar"
        aria-live="polite"
        className={clsx(
          'bg-secondary-background fixed inset-y-0 z-50 grid h-full max-h-screen w-80 max-w-[90vw] grid-rows-[auto_1fr_auto] border-r border-gray-300 transition-transform duration-500 lg:sticky lg:top-0 ltr:left-0 max-lg:ltr:-translate-x-full rtl:right-0 max-lg:rtl:translate-x-full dark:border-gray-600',
          isOpen && 'translate-x-0!',
        )}
      >
        <SidebarHeader
          title={t('title')}
          isOpen={isOpen}
          onClose={handleClose}
        />
        <SidebarNavigation role={role} t={t} onClose={handleClose} />
        <SidebarFooter />
      </aside>
    </>
  );
}

const Backdrop = memo(function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-hidden
      onClick={onClose}
      className="fixed inset-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-sm supports-backdrop-filter:bg-black/25 lg:hidden"
    />
  );
});

function SidebarNavigation({ role, t, onClose }: SidebarNavigationProps) {
  const tabs = useMemo(() => getSidebarTabs(role, t), [role, t]);

  return (
    <nav className="grid grid-rows-[auto_auto_1fr]">
      <ul className="space-y-2 p-4">
        {tabs.map((tab) => (
          <SidebarLink
            key={tab.href}
            {...tab}
            onNvaigate={onClose}
            icon={<tab.icon className="size-6 shrink-0" />}
          />
        ))}
      </ul>
    </nav>
  );
}

const SidebarHeader = memo(function SidebarHeader({
  title,
  isOpen,
  onClose,
}: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="relative size-7">
          <Image
            src={logoImg}
            alt=""
            aria-labelledby="sidebar-title"
            className="object-contain object-center"
          />
        </div>
        <h1 id="sidebar-title" className="text-2xl font-bold">
          {title}
        </h1>
      </div>

      {isOpen && <CloseMenu onClose={onClose} />}
    </div>
  );
});

const SidebarFooter = memo(function SidebarFooter() {
  return (
    <div className="m-4 flex flex-col justify-end space-y-2">
      <Logout />

      <div className="bg-primary-background flex items-center justify-center gap-2 rounded-2xl p-2 lg:hidden">
        <ThemeToggle />
        <LocaleToggle />
      </div>
    </div>
  );
});

export default Sidebar;

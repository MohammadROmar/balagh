'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { useSidebarContext } from '../store/sidebar';
import SidebarLink from './sidebar-link';
import Logout from '@/features/auth/components/logout';
import { CloseMenu } from './hamburger-menu-btn';
import { getSidebarTabs } from '../utils/get-sidebar-tabs';
import logoImg from '@/assets/images/logo.png';
import ThemeToggle from './theme-toggle';
import LocaleToggle from './locale-toggle';

type SidebarProps = { role: 'Administrator' | 'Employee' };

function Sidebar({ role }: SidebarProps) {
  const t = useTranslations('sidebar');
  const { isOpen, setIsOpen } = useSidebarContext();

  const tabs = getSidebarTabs(role, t);

  return (
    <>
      {isOpen && (
        <div
          aria-hidden
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 h-screen w-screen bg-black/50 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        aria-live="polite"
        className={clsx(
          'bg-secondary-background max-w-[90vw]border-r fixed inset-y-0 z-50 w-80 border-gray-300 transition-transform duration-500 lg:static ltr:left-0 max-lg:ltr:-translate-x-full rtl:right-0 max-lg:rtl:translate-x-full dark:border-gray-600',
          isOpen && 'translate-x-0!',
        )}
      >
        <nav className="grid h-full grid-rows-[auto_auto_1fr]">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <div className="relative size-7">
                <Image
                  src={logoImg}
                  alt=""
                  aria-hidden
                  fill
                  sizes="28px"
                  className="object-contain object-center"
                />
              </div>
              <h1 className="text-2xl font-bold">{t('title')}</h1>
            </div>

            {isOpen && <CloseMenu />}
          </div>

          <ul className="bort space-y-2 p-4">
            {tabs.map((tab) => (
              <SidebarLink
                key={tab.href}
                {...tab}
                onNvaigate={() => setIsOpen(false)}
                icon={<tab.icon className="size-6 shrink-0" />}
              />
            ))}
          </ul>

          <div className="m-4 flex flex-col justify-end space-y-2">
            <Logout />

            <div className="bg-primary-background flex items-center justify-center gap-2 rounded-2xl p-2 lg:hidden">
              <ThemeToggle />
              <LocaleToggle />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

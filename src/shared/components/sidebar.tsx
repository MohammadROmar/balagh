import { getTranslations } from 'next-intl/server';

import SidebarLink from './sidebar-link';
import { getSidebarTabs } from '../utils/get-sidebar-tabs';
import LogoutIcon from '@/assets/icons/logout';

type SidebarProps = { role: 'Administrator' | 'Employee' };

async function Sidebar({ role }: SidebarProps) {
  const t = await getTranslations('sidebar');

  const tabs = getSidebarTabs(role, t);

  return (
    <aside className="bg-secondary-background fixed inset-y-0 grid w-80 max-w-[90vw] grid-rows-[auto_auto_1fr] border-r border-gray-300 lg:static ltr:-left-full rtl:-right-full dark:border-gray-600">
      <h1 className="p-4 text-2xl font-bold">{t('title')}</h1>

      <ul className="bort space-y-2 border-t border-gray-300 p-4 dark:border-gray-600">
        {tabs.map((tab) => (
          <SidebarLink
            key={tab.href}
            {...tab}
            icon={<tab.icon className="size-6 shrink-0" />}
          />
        ))}
      </ul>

      <div className="flex items-end">
        <button className="text-error button m-4 flex cursor-pointer gap-2 bg-none p-4 font-normal">
          <span>
            <LogoutIcon className="size-6 shrink-0" />
          </span>
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

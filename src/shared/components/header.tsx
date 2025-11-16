import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import ThemeToggle from './theme-toggle';
import LocaleToggle from './locale-toggle';
import HamburgerMenuBtn from './hamburger-menu-btn';
import logoImg from '@/assets/images/logo.png';

async function Header() {
  const t = await getTranslations();

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 px-4 dark:border-gray-600">
      <div className="flex h-min items-center gap-2 p-4 lg:opacity-0">
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
        <h1 className="text-2xl font-bold">{t('metadata.root.title')}</h1>
      </div>

      <div className="flex items-center gap-2 max-lg:hidden">
        <ThemeToggle />
        <LocaleToggle />
      </div>

      <HamburgerMenuBtn />
    </header>
  );
}

export default Header;

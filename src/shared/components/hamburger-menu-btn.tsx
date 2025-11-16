'use client';

import { useSidebarContext } from '../store/sidebar';
import HamburgerIcon from '@/assets/icons/hamburger';
import CloseIcon from '@/assets/icons/close';
import { useTranslations } from 'next-intl';
import useViewport from '../hooks/use-viewport';

export default function HamburgerMenuBtn() {
  const { setIsOpen } = useSidebarContext();
  const { width } = useViewport();
  const t = useTranslations('accessibility.sidebar');

  const isMobile = width < 1024;

  return (
    <button
      aria-label={t('open')}
      title={t('open')}
      aria-controls="sidebar"
      aria-expanded={isMobile ? 'false' : true}
      onClick={() => setIsOpen(true)}
      className="cursor-pointer lg:hidden"
    >
      <HamburgerIcon className="size-7 shrink-0" />
    </button>
  );
}

export function CloseMenu() {
  const { setIsOpen } = useSidebarContext();
  const t = useTranslations('accessibility.sidebar');

  return (
    <button
      aria-label={t('close')}
      title={t('close')}
      aria-controls="sidebar"
      aria-expanded="true"
      onClick={() => setIsOpen(false)}
      className="cursor-pointer lg:hidden"
    >
      <CloseIcon className="size-7 shrink-0 lg:hidden" />
    </button>
  );
}

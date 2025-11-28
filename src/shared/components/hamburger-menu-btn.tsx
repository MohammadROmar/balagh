'use client';

import { useTranslations } from 'next-intl';

import { useScreenSize } from '../hooks/use-screen-size';
import { useSidebarContext } from '../store/sidebar';
import HamburgerIcon from '@/assets/icons/hamburger';
import CloseIcon from '@/assets/icons/close';
import { memo } from 'react';

type CloseMenuProps = { onClose: () => void };

export default function HamburgerMenuBtn() {
  const { setIsOpen } = useSidebarContext();
  const { width } = useScreenSize();
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

export const CloseMenu = memo(function CloseMenu({ onClose }: CloseMenuProps) {
  const t = useTranslations('accessibility.sidebar');

  return (
    <button
      aria-label={t('close')}
      title={t('close')}
      aria-controls="sidebar"
      aria-expanded="true"
      onClick={onClose}
      className="cursor-pointer lg:hidden"
    >
      <CloseIcon className="size-7 shrink-0 lg:hidden" />
    </button>
  );
});

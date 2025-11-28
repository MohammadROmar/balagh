'use client';

import { useRef, useEffect } from 'react';

import { useScrollLock } from './use-scroll-lock';
import { useSidebarContext } from '../store/sidebar';

export function useDialog(isOpen: boolean) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen: isSidebarOpen } = useSidebarContext();

  const { lock, unlock, isLocked } = useScrollLock({ autoLock: false });

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (!isOpen && isLocked) {
      unlock();
    }

    if (isOpen && !dialog.open) {
      if (!isSidebarOpen) lock();

      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      if (!isSidebarOpen) unlock();

      dialog.close();
    }
  }, [isOpen]);

  return dialogRef;
}

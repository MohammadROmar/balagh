'use client';

import { useRef, useState, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

type UseScrollLockOptions = {
  autoLock?: boolean;
  widthReflow?: boolean;
};
type UseScrollLockReturn = {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
};
type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow'];
  paddingRight: CSSStyleDeclaration['paddingRight'];
};

const IS_SERVER = typeof window === 'undefined';

export function useScrollLock(
  options: UseScrollLockOptions = {},
): UseScrollLockReturn {
  const { autoLock = true, widthReflow = true } = options;

  const [isLocked, setIsLocked] = useState(false);
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<OriginalStyle | null>(null);

  const lock = useCallback(() => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style;
      // Save the original styles
      originalStyle.current = { overflow, paddingRight };
      // Prevent width reflow
      if (widthReflow) {
        // Use window inner width if body is the target as global scrollbar isn't part of the document
        const offsetWidth =
          target.current === document.body
            ? window.innerWidth
            : target.current.offsetWidth;
        // Get current computed padding right in pixels
        const currentPaddingRight =
          parseInt(window.getComputedStyle(target.current).paddingRight, 10) ||
          0;
        const scrollbarWidth = offsetWidth - target.current.scrollWidth;
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`;
      }
      // Lock the scroll
      target.current.style.overflow = 'hidden';
      setIsLocked(true);
    }
  }, [widthReflow]);

  const unlock = useCallback(() => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = 'auto';
      // Only reset padding right if we changed it
      if (widthReflow) {
        target.current.style.paddingRight = '0';
      }
    }
    setIsLocked(false);
  }, [widthReflow]);

  useIsomorphicLayoutEffect(() => {
    if (IS_SERVER) return;

    if (!target.current) {
      target.current = document.body;
    }

    if (autoLock) {
      lock();
    }

    return () => {
      unlock();
    };
  }, [autoLock, widthReflow, lock, unlock]);

  return { isLocked, lock, unlock };
}
export type { UseScrollLockOptions, UseScrollLockReturn };

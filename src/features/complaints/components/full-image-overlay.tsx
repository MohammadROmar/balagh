'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import ArrowLeftIcon from '@/assets/icons/arrow-left';
import XIcon from '@/assets/icons/x';
import type { ComplaintFile } from '../models/complaint';
import { FocusTrap } from 'focus-trap-react';

type Props = {
  images: ComplaintFile[];
  opendImage: number;
  close: () => void;
};

function ComplaintFullImageOverlay({ images, opendImage, close }: Props) {
  const [currentIndex, setCurrentIndex] = useState(opendImage);

  const t = useTranslations('complaintsPage.details.imagesOverlay');

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [close]);

  return (
    <FocusTrap active focusTrapOptions={{ allowOutsideClick: false }}>
      <section className="fixed z-60 size-full before:fixed before:inset-0 before:z-50 before:size-full before:bg-black/75 before:backdrop-blur-sm supports-backdrop-filter:before:bg-black/30">
        <button
          aria-label={t('close')}
          title={t('close')}
          onClick={close}
          className="bg-primary-background fixed top-4 z-70 cursor-pointer rounded-full border border-gray-300 p-2 ltr:right-4 rtl:left-4 dark:border-gray-600"
        >
          <XIcon className="size-3" />
        </button>

        <button
          aria-label={t('prev')}
          title={t('prev')}
          disabled={currentIndex === images.length - 1}
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="bg-primary-background fixed top-1/2 z-70 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-current/50 ltr:right-4 rtl:left-4 dark:border-gray-600"
        >
          <ArrowLeftIcon className="size-4 ltr:rotate-180" />
        </button>

        <button
          aria-label={t('prev')}
          title={t('prev')}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="bg-primary-background fixed top-1/2 z-70 -translate-y-1/2 cursor-pointer rounded-full border border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-current/50 ltr:left-4 rtl:right-4 dark:border-gray-600"
        >
          <ArrowLeftIcon className="size-4 rtl:rotate-180" />
        </button>

        <div className="fixed top-1/2 left-1/2 z-60 -translate-x-1/2 -translate-y-1/2 rounded-2xl select-none">
          <div className="relative h-[90vh] max-h-[90vh] w-[75vw] max-w-[75vw]">
            <Image
              src={images[currentIndex].path}
              alt={`Complaint image #${currentIndex}`}
              fill
              sizes="(max-width: 600px) 75vw, 600px"
              className="rounded-2xl object-contain object-center"
            />
          </div>
        </div>

        <div className="bg-primary-background fixed bottom-4 left-1/2 z-70 -translate-x-1/2 rounded-2xl border border-gray-300 p-2 dark:border-gray-600">
          {t('imageNumber', { curr: currentIndex + 1, max: images.length })}
        </div>
      </section>
    </FocusTrap>
  );
}

export default ComplaintFullImageOverlay;

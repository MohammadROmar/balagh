'use client';

import { Suspense } from 'react';

import LoadingSpinner from '@/assets/icons/loading-spinner';
import dynamic from 'next/dynamic';

const ThemeToggleButton = dynamic(() => import('./theme-toggle-btn'), {
  ssr: false,
});

export default function ThemeToggle() {
  return (
    <div className="bg-secondary-background text-secondary flex size-9 items-center justify-center rounded-2xl hover:bg-gray-300 hover:dark:bg-gray-600">
      <Suspense
        fallback={<LoadingSpinner className="size-4 animate-spin md:size-5" />}
      >
        <ThemeToggleButton />
      </Suspense>
    </div>
  );
}

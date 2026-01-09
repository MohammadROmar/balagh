'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import InfoIcon from '@/assets/icons/info';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import logoImg from '@/assets/images/logo.png';

type SessionCleanupProps = { hasUser: boolean };

function SessionCleanup({ hasUser }: SessionCleanupProps) {
  const router = useRouter();

  const t = useTranslations('redirectPage');

  useEffect(() => {
    if (!hasUser) {
      fetch('/api/users/token/delete', {
        method: 'DELETE',
      })
        .then(() => router.replace('/'))
        .catch((e) => console.error(e));
    }
  }, [hasUser, router]);

  if (hasUser) {
    return null;
  }

  return (
    <section className="mx-auto flex h-screen w-screen items-center justify-center p-4 text-center lg:w-[50vw]">
      <div className="bg-secondary-background flex h-fit flex-col items-center justify-center gap-4 rounded-2xl border border-gray-300 p-4 shadow dark:border-gray-600">
        <div className="mb-12 flex items-center gap-2">
          <div className="relative size-7">
            <Image
              src={logoImg}
              alt=""
              aria-labelledby="session-cleanup-title"
              className="object-contain object-center"
            />
          </div>
          <h1 id="session-cleanup-title" className="text-2xl font-bold">
            {t('balagh')}
          </h1>
        </div>

        <div className="bg-teal/30 flex items-center justify-center rounded-full p-3">
          <InfoIcon className="text-teal size-8" />
        </div>

        <h2 className="text-heading text-4xl font-bold">{t('title')}</h2>
        <p className="text-secondary max-w-lg text-sm text-balance">
          {t('subtitle')}
        </p>

        <LoadingIndicator className="text-emerald-green flex w-12 items-center justify-center" />
      </div>
    </section>
  );
}

export default SessionCleanup;

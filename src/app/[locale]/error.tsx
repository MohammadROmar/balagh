'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import InfoIcon from '@/assets/icons/info';

export default function ErrorPage() {
  const t = useTranslations('errors.page');

  return (
    <section className="flex size-full h-screen w-screen flex-col items-center justify-center space-y-4 text-center text-balance">
      <div className="bg-teal/30 flex items-center justify-center rounded-full p-3">
        <InfoIcon className="text-teal size-8" />
      </div>

      <h2 className="text-heading text-3xl font-bold">{t('title')}</h2>
      <p className="text-secondary text-sm">{t('subtitle')}</p>

      <div className="flex items-center gap-4">
        <Link href="/" className="button text-nowrap">
          {t('actions.goHome')}
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="button border-teal text-teal border bg-none text-nowrap"
        >
          {t('actions.refresh')}
        </button>
      </div>
    </section>
  );
}

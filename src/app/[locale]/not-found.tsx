import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import SearchOff from '@/assets/icons/search-off';

async function NotFoundPage() {
  const t = await getTranslations('notFoundPage');

  return (
    <section className="flex size-full h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="bg-teal/30 flex items-center justify-center rounded-full p-3">
        <SearchOff className="text-teal size-8" />
      </div>

      <h2 className="text-heading text-3xl font-bold">{t('title')}</h2>
      <p className="text-secondary text-sm">{t('subtitle')}</p>

      <Link href="/" className="button w-fit text-nowrap">
        {t('goHome')}
      </Link>
    </section>
  );
}

export default NotFoundPage;

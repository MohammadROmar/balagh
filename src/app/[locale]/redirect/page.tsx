import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import InfoIcon from '@/assets/icons/info';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import { redirect } from '@/i18n/navigation';
import { getSession } from '@/features/auth/api/get-session';
import logoImg from '@/assets/images/logo.png';

async function RedirectPage() {
  const locale = await getLocale();
  const t = await getTranslations('redirectPage.redirect');

  const user = await getSession();

  if (user === null) {
    redirect({ href: '/', locale });
  } else if (user && user.role === 'Administrator') {
    redirect({ href: '/admin/reports', locale });
  } else if (user && user.role === 'Employee') {
    redirect({ href: '/dashboard/complaints', locale });
  }

  return (
    <section className="mx-auto flex h-screen w-screen items-center justify-center p-4 text-center lg:w-[50vw]">
      <div className="bg-secondary-background flex h-fit flex-col items-center justify-center gap-4 rounded-2xl border border-gray-300 p-4 shadow dark:border-gray-600">
        <div className="mb-12 flex items-center gap-2">
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
          <h1 className="text-2xl font-bold">{t('balagh')}</h1>
        </div>

        <div className="bg-teal/30 flex items-center justify-center rounded-full p-3">
          <InfoIcon className="text-teal size-8" />
        </div>

        <h2 className="text-heading text-4xl font-bold">{t('title')}</h2>
        <p className="text-secondary max-w-lg text-sm text-balance">
          {t('subtitle')}
        </p>

        <LoadingIndicator className="text-teal flex w-12 items-center justify-center" />
      </div>
    </section>
  );
}

export default RedirectPage;

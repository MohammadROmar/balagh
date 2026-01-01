import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from 'next-intl';

import ThemeToggle from '@/shared/components/theme-toggle';
import LocaleToggle from '@/shared/components/locale-toggle';
import LoginForm from '@/features/auth/components/login-form';
import SidePanel from '@/features/auth/components/side-panel';
import logoImg from '@/assets/images/logo.png';
import { getSession } from '@/features/auth/api/get-session';
import { redirect } from '@/i18n/navigation';

type HomeProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: `${t('login')} - ${t('root.title')}` };
}

async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  const user = await getSession();

  if (user && user.role === 'Administrator') {
    redirect({ href: '/admin/reports', locale });
  } else if (user && user.role === 'Employee') {
    redirect({ href: '/dashboard/complaints', locale });
  }

  setRequestLocale(locale);

  const t = await getTranslations('loginPage');

  return (
    <main className="container m-auto grid grid-cols-1 lg:grid-cols-2">
      <section className="flex-1 px-4 lg:px-20 xl:px-24">
        <div className="m-auto flex min-h-screen w-full max-w-96 flex-col items-center justify-center space-y-8 py-12 lg:w-96">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
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
              <h1 className="text-2xl font-bold">{t('title')}</h1>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LocaleToggle />
            </div>
          </div>

          <div>
            <h2 className="text-heading text-3xl font-bold tracking-tight">
              {t('login')}
            </h2>
            <p className="text-secondary mt-2 text-sm">{t('subtitle')}</p>

            <LoginForm />
          </div>
        </div>
      </section>

      <SidePanel t={t} />
    </main>
  );
}

export default HomePage;

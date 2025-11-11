import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from 'next-intl';

import ThemeToggle from '@/shared/components/theme-toggle';
import LocaleToggle from '@/shared/components/locale-toggle';
import LoginForm from '@/features/auth/components/login-form';
import SidePanel from '@/features/auth/components/side-panel';

type HomeProps = { params: Promise<{ locale: Locale }> };

async function HomePage({ params }: HomeProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('loginPage');

  return (
    <main className="container m-auto grid grid-cols-1 lg:grid-cols-2">
      <section className="flex-1 px-4 lg:px-20 xl:px-24">
        <div className="m-auto flex min-h-screen w-full max-w-96 flex-col items-center justify-center space-y-8 py-12 lg:w-96">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-heading text-2xl font-bold tracking-tight">
              {t('title')}
            </h1>
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

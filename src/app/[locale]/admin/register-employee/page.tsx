import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import RegisterEmployeeForm from '@/features/employees/components/register-employee-form';
import PageTitle from '@/shared/components/page-title';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('register-employee') };
}

async function RegisterEmployeePage() {
  const t = await getTranslations('adminPages.registerEmployee');

  return (
    <section className="grid grid-rows-[auto_auto_1fr]">
      <PageTitle title={t('title')} />

      <RegisterEmployeeForm />
    </section>
  );
}

export default RegisterEmployeePage;

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import RegisterEmployeeForm from '@/features/employees/components/register-employee-form';
import PageTitle from '@/features/dashboard/components/page-title';
import { get } from '@/shared/api/get';
import type { GovermentalEntities } from '@/features/employees/models/govermental-entities';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');

  return { title: t('register-employee') };
}

async function RegisterEmployeePage() {
  const t = await getTranslations('adminPages.registerEmployee');

  const response = await get<GovermentalEntities>('/api/govermentalEntities');

  const govermentalEntities =
    response.message === 'success' ? response.data : null;

  return (
    <section className="grid grid-rows-[auto_auto_1fr]">
      <PageTitle title={t('title')} />

      <RegisterEmployeeForm govermentalEntities={govermentalEntities} />
    </section>
  );
}

export default RegisterEmployeePage;

import RegisterEmployeeForm from '@/features/employees/components/register-employee-form';
import { getTranslations } from 'next-intl/server';

async function RegisterEmployeePage() {
  const t = await getTranslations('adminPages.registerEmployee');

  return (
    <section className="grid grid-rows-[auto_auto_1fr]">
      <h2 className="text-4xl font-bold">{t('title')}</h2>
      <p className="text-secondary text-sm">{t('subtitle')}</p>

      <RegisterEmployeeForm />
    </section>
  );
}

export default RegisterEmployeePage;

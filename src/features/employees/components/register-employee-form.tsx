'use client';

import { useActionState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import Input from '@/shared/components/input';
import FormErrors from '@/shared/components/form-errors';
import LoadingIndicator from '@/assets/icons/loading-indicator';
import { registerEmployeeAction } from '../api/register-employee';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function RegisterEmployeeForm() {
  const [state, formAction, pending] = useActionState(registerEmployeeAction, {
    message: undefined,
  });

  const locale = useLocale();
  const t = useTranslations('forms');
  const tEmployee = useTranslations('adminPages.registerEmployee');
  const router = useRouter();

  useEffect(() => {
    if (state.message === 'success') {
      toast.success(tEmployee('registered'), {
        classNames: {
          title: 'text-heading!',
          toast:
            'bg-secondary-background! border-gray-300! dark:border-gray-600!',
          icon: 'text-success',
        },
      });

      router.push(`/${locale}/admin`);
    }
  }, [state.message]);

  return (
    <form
      action={formAction}
      className="lg:bg-secondary-background mt-8 space-y-6 border-gray-300 max-lg:flex max-lg:flex-col max-lg:justify-between lg:h-fit lg:rounded-2xl lg:border lg:p-4 dark:border-gray-600"
    >
      <div className="space-y-6">
        <Input
          id="username"
          label={t('labels.username')}
          autoComplete="username"
          placeholder={t('placeholders.username')}
          defaultValue={state.defaultValues?.username}
          error={state.errors?.username ? t('errors.username') : undefined}
          className="lg:bg-primary-background!"
        />
        <Input
          id="phoneNumber"
          label={t('labels.phoneNumber')}
          autoComplete="tel"
          defaultValue={state.defaultValues?.phoneNumber}
          placeholder={t('placeholders.phoneNumber')}
          error={
            state.errors?.phoneNumber ? t('errors.phoneNumber') : undefined
          }
          className="lg:bg-primary-background!"
        />
        <Input
          id="email"
          label={t('labels.emailAddress')}
          autoComplete="email"
          type="email"
          defaultValue={state.defaultValues?.email}
          placeholder={t('placeholders.emailAddress')}
          error={state.errors?.email ? t('errors.email') : undefined}
          className="lg:bg-primary-background!"
        />
        <Input
          id="password"
          label={t('labels.password')}
          autoComplete="new-password"
          type="password"
          defaultValue={state.defaultValues?.password}
          placeholder={t('placeholders.password')}
          error={state.errors?.password ? t('errors.password') : undefined}
          className="lg:bg-primary-background!"
        />
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-2 max-lg:w-full max-lg:flex-col-reverse">
          <button
            disabled={pending}
            type="reset"
            className="button bg-none font-normal text-current max-lg:w-full"
          >
            {t('actions.reset')}
          </button>
          <button
            disabled={pending}
            className="button flex items-center justify-center max-lg:w-full"
          >
            {pending ? (
              <LoadingIndicator className="w-7" />
            ) : (
              t('actions.register')
            )}
          </button>
        </div>
      </div>

      <FormErrors message={state.message} />
    </form>
  );
}

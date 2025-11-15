'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import Input from '@/shared/components/input';
import { loginAction } from '../api/login';
import FormErrors from '@/shared/components/form-errors';
import LoadingIndicator from '@/assets/icons/loading-indicator';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    message: undefined,
    errors: {},
  });

  const tLogin = useTranslations('loginPage');
  const tForms = useTranslations('forms');

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <Input
        type="email"
        id="email"
        defaultValue={state.email}
        autoComplete="email"
        placeholder={tForms('placeholders.emailAddress')}
        label={tForms('labels.emailAddress')}
        error={state.errors.email ? tForms('errors.email') : undefined}
      />
      <Input
        type="password"
        id="password"
        defaultValue={state.password}
        autoComplete="current-password"
        placeholder={tForms('placeholders.password')}
        label={tForms('labels.password')}
        error={state.errors.password ? tForms('errors.password') : undefined}
      />

      <div className="flex justify-end">
        <Link href="/" className="text-emerald-green text-sm hover:opacity-90">
          {tLogin('forgotPassword')}
        </Link>
      </div>

      <button
        disabled={pending}
        aria-live="polite"
        className="button flex items-center justify-center"
      >
        {pending ? <LoadingIndicator className="w-7" /> : tLogin('login')}
      </button>

      <FormErrors message={state.message} />
    </form>
  );
}

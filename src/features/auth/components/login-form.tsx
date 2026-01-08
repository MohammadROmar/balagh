'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';

import Input from '@/shared/components/input';
import FormErrors from '@/shared/components/form-errors';
import Button from '@/shared/components/button';
import { loginAction } from '../api/login';

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

      <Button
        pending={pending}
        aria-live="polite"
        className="flex items-center justify-center"
      >
        {tLogin('login')}
      </Button>

      <FormErrors message={state.message} />
    </form>
  );
}

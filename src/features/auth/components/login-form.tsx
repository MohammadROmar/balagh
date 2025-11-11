'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import Input from '@/shared/components/input';
import { loginAction } from '../api/action';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {
    message: undefined,
    errors: {},
  });

  const tLogin = useTranslations('loginPage');
  const tErrors = useTranslations('errors.input');

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <Input
        type="email"
        id="email"
        required
        defaultValue={state.email}
        autoComplete="email"
        placeholder="example@mail.com"
        label={tLogin('email')}
        error={state.errors.email ? tErrors('email') : undefined}
      />
      <Input
        type="password"
        id="password"
        required
        defaultValue={state.password}
        autoComplete="current-password"
        placeholder="********"
        label={tLogin('password')}
        error={state.errors.password ? tErrors('password') : undefined}
      />

      <div className="flex justify-end">
        <Link href="/" className="text-emerald-green text-sm hover:opacity-90">
          {tLogin('forgotPassword')}
        </Link>
      </div>

      <button disabled={pending} className="button">
        {tLogin('login')}
      </button>
    </form>
  );
}

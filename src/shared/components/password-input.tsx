'use client';

import { useState, useMemo, type ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import Input from './input';
import XIcon from '@/assets/icons/x';
import CheckMark from '@/assets/icons/check-mark';

type InputProps = { label: string; error?: string } & ComponentProps<'input'>;

const REQUIREMENTS = [
  {
    key: 'hasUpper',
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    key: 'hasLower',
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    key: 'hasNumber',
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    key: 'hasSpecial',
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
  {
    key: 'length',
    test: (value: string) => value.length >= 8,
  },
];

function PasswordInput(props: InputProps) {
  const [password, setPassword] = useState('');

  return (
    <div className="space-y-2">
      <Input
        id="password"
        autoComplete="new-password"
        type="password"
        {...props}
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />

      <PasswordRules password={password} />
    </div>
  );
}

function PasswordRules({ password }: { password: string }) {
  const t = useTranslations('passwordRules');

  const results = useMemo(() => {
    return REQUIREMENTS.map((req) => ({
      key: req.key,
      passed: req.test(password),
    }));
  }, [password]);

  return (
    <ul className="text-secondary grid grid-cols-1 gap-x-4 gap-y-2 text-sm md:grid-cols-2">
      {results.map(({ key, passed }) => (
        <li key={key} className="flex items-center gap-2">
          <span
            className={clsx(
              'flex items-center justify-center overflow-hidden rounded-full p-1 text-white',
              passed ? 'bg-success' : 'bg-error',
            )}
          >
            {passed ? (
              <CheckMark className="size-1.5 scale-200" />
            ) : (
              <XIcon className="size-1.5" />
            )}
          </span>
          <span className={passed ? 'text-success' : undefined}>
            {t(key as any)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default PasswordInput;

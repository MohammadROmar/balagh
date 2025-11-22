import { useTranslations } from 'next-intl';
import type { ActionMessage } from '@/core/models/action-message';
import clsx from 'clsx';

type FormErrorsProps = {
  message: ActionMessage;
  className?: string;
};

function FormErrors({ message, className }: FormErrorsProps) {
  const t = useTranslations('errors');

  if (
    message === undefined ||
    message === 'success' ||
    message === 'invalid-input'
  ) {
    return null;
  }

  return (
    <p
      className={clsx('text-error mt-2 text-sm whitespace-pre-wrap', className)}
    >
      {t.has(message) ? t(message) : t('unknown')}
    </p>
  );
}

export default FormErrors;

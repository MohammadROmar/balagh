import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import InfoIcon from '@/assets/icons/info';
import type { ActionMessage } from '@/core/models/action-message';

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
    <div className="bg-error-bg border-error/35 mt-4 flex items-center gap-2 rounded-2xl border px-4 py-2 dark:bg-red-50/10">
      <InfoIcon className="text-error size-4.5 shrink-0" />
      <p className={clsx('text-error text-sm whitespace-pre-wrap', className)}>
        {t.has(message) ? t(message) : t('unknown')}
      </p>
    </div>
  );
}

export default FormErrors;

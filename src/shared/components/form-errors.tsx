import { useTranslations } from 'next-intl';
import type { ActionMessage } from '@/config/models/action-message';

type FormErrorsProps = {
  message: ActionMessage;
};

function FormErrors({ message }: FormErrorsProps) {
  const t = useTranslations('errors');

  if (
    message === undefined ||
    message === 'success' ||
    message === 'invalid-input'
  ) {
    return null;
  }

  return (
    <p className="text-error mt-2 text-sm whitespace-pre-wrap">
      {t.has(message) ? t(message) : t('unknown')}
    </p>
  );
}

export default FormErrors;

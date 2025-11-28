'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import FormErrors from '@/shared/components/form-errors';
import RequestIcon from '@/assets/icons/request';
import SendIcon from '@/assets/icons/send';
import Button from '@/shared/components/button';
import { requestAdditionalInfo } from '../api/request-info';

function RequestComplaintInfo({ id }: { id: string }) {
  const action = requestAdditionalInfo.bind(null, id);

  const [state, formAction, pending] = useActionState(action, {
    id: '',
    message: undefined,
    data: '',
  });

  const t = useTranslations('complaintsPage.details');

  useEffect(() => {
    if (state.message === 'success') {
      toast.success(t('requestSent'), {
        classNames: {
          title: 'text-heading!',
          toast:
            'bg-secondary-background! rounded-2xl! border-gray-300! dark:border-gray-600!',
          icon: 'text-success',
        },
      });
    }
  }, [state.id]);

  return (
    <form action={formAction} className="space-y-1">
      <label
        htmlFor="requestMessage"
        className="flex items-center gap-2 lg:text-sm"
      >
        <span>
          <RequestIcon className="size-5 lg:size-4" />
        </span>
        <span>{t('requestInfoTitle')}</span>
      </label>
      <textarea
        rows={4}
        id="requestMessage"
        name="requestMessage"
        required
        defaultValue={state.data}
        placeholder={t('requestInfo')}
        className="input w-full lg:text-sm"
      />
      {state.message === 'invalid-input' && (
        <p className="text-error text-sm">{t('invalid-input')}</p>
      )}

      <div className="flex justify-end">
        <Button
          pending={pending}
          className="flex items-center gap-2 max-lg:w-fit lg:justify-center"
        >
          <span>
            <SendIcon className="size-5" />
          </span>
          <span>{t('sendRequest')}</span>
        </Button>
      </div>
      <FormErrors message={state.message} className="lg:text-xs" />
    </form>
  );
}

export default RequestComplaintInfo;

'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import StatusIcon from '@/assets/icons/status';
import Button from '@/shared/components/button';
import SaveIcon from '@/assets/icons/save';
import FormErrors from '@/shared/components/form-errors';
import StatusSelect from './status-selector';
import { changeComplaintStatus } from '../api/change-status';
import type { Complaint } from '../models/complaint';

type Props = { complaint: Complaint };

function ChangeComplaintStatus({ complaint }: Props) {
  const action = changeComplaintStatus.bind(null, {
    id: complaint.id.toString(),
    rowVersion: complaint.rowVersion,
  });

  const [state, formAction, pending] = useActionState(action, {
    id: '',
    message: undefined,
    status: complaint.status,
  });

  const t = useTranslations('complaintsPage.details');

  useEffect(() => {
    if (state.message === 'success') {
      toast.success(t('statusChanged'), {
        classNames: {
          title: 'text-heading!',
          toast:
            'bg-secondary-background! rounded-2xl! border-gray-300! dark:border-gray-600!',
          icon: 'text-success',
        },
      });
    }
  }, [state.id, state.message, t]);

  return (
    <form action={formAction} className="space-y-1">
      <label htmlFor="status" className="flex items-center gap-2 lg:text-sm">
        <span>
          <StatusIcon className="size-5 lg:size-4" />
        </span>
        <span>{t('changeStatus')}</span>
      </label>
      <StatusSelect status={state.status} required />
      {state.message === 'invalid-input' && (
        <p className="text-error text-sm">{t('invalid-input')}</p>
      )}

      <div className="mt-2 flex justify-end">
        <Button
          pending={pending}
          className="flex items-center gap-2 max-lg:w-fit lg:justify-center"
        >
          <span>
            <SaveIcon className="size-5" />
          </span>
          <span>{t('save')}</span>
        </Button>
      </div>

      <FormErrors message={state.message} className="lg:text-sm" />
    </form>
  );
}

export default ChangeComplaintStatus;

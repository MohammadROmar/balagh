'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import FormErrors from '@/shared/components/form-errors';
import ProcessIcon from '@/assets/icons/process';
import { proceedComplaint } from '../api/proceed';
import Button from '@/shared/components/button';
import type { Complaint } from '../models/complaint';

function ProceedComplaint({ complaint }: { complaint: Complaint }) {
  const action = proceedComplaint.bind(null, {
    id: complaint.id.toString(),
    rowVersion: complaint.rowVersion,
  });

  const [state, formAction, pending] = useActionState(action, {
    id: '',
    message: undefined,
  });

  const t = useTranslations('complaintsPage.details');

  useEffect(() => {
    if (state.message === 'success') {
      toast.success(t('proceedSuccess'), {
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
      <div className="flex items-center gap-2">
        <ProcessIcon className="size-5 lg:size-4" />
        <p className="lg:text-sm">{t('proceedComplaint')}</p>
      </div>
      <p className="text-secondary text-sm lg:text-xs">{t('processdNote')}</p>
      {complaint.isLocked ? (
        <p className="text-warning bg-warning-bg mt-2 rounded-2xl px-2 py-1 text-center text-balance lg:text-sm">
          {t('complaintLocked', { name: complaint.lockedByUserName })}
        </p>
      ) : (
        <Button
          pending={pending}
          className="mt-2 flex items-center gap-2 max-lg:w-fit lg:justify-center"
        >
          <span>
            <ProcessIcon className="size-5" />
          </span>
          <span>{t('proceed')}</span>
        </Button>
      )}
      <FormErrors message={state.message} className="lg:text-xs" />
    </form>
  );
}

export default ProceedComplaint;

'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Select from 'react-select';
import clsx from 'clsx';

import StatusIcon from '@/assets/icons/status';
import SaveIcon from '@/assets/icons/save';
import FormErrors from '@/shared/components/form-errors';
import { complaintStatus } from '../models/status';
import { changeComplaintStatus } from '../api/change-status';
import type { TFunction } from '@/shared/models/tfunction';

type Props = { id: string; status: string };
type StatusSelectProps = {
  status: string;
  t: TFunction<'complaintsPage.details'>;
};

function ChangeComplaintStatus({ id, status }: Props) {
  const action = changeComplaintStatus.bind(null, id);

  const [state, formAction, pending] = useActionState(action, {
    id: '',
    message: undefined,
    status,
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
  }, [state.id]);

  return (
    <form action={formAction} className="space-y-1">
      <label htmlFor="status" className="flex items-center gap-2 lg:text-sm">
        <span>
          <StatusIcon className="size-5 lg:size-4" />
        </span>
        <span>{t('changeStatus')}</span>
      </label>
      <StatusSelect status={state.status} t={t} />
      {state.message === 'invalid-input' && (
        <p className="text-error text-sm">{t('invalid-input')}</p>
      )}

      <div className="mt-2 flex justify-end">
        <button
          disabled={pending}
          className="button flex items-center gap-2 max-lg:w-fit lg:justify-center"
        >
          <span>
            <SaveIcon className="size-5" />
          </span>
          <span>{t('save')}</span>
        </button>
      </div>

      <FormErrors message={state.message} className="lg:text-sm" />
    </form>
  );
}

function StatusSelect({ status, t }: StatusSelectProps) {
  const options = complaintStatus.map((status) => ({
    value: status,
    label: t(`statuses.${status}` as any),
  }));

  return (
    <Select
      required
      isClearable={false}
      inputId="status"
      name="status"
      options={options}
      defaultValue={options.find((option) => option.value === status)}
      classNames={{
        control: (state) =>
          clsx(
            'focus:ring-emerald-green! transition-none! w-full! rounded-2xl! border! border-gray-200! bg-gray-50! focus:ring-2! focus:outline-0! lg:text-sm! dark:border-gray-700! dark:bg-gray-800!',
            state.isFocused && 'outline-2! outline-emerald-green!',
          ),
        menu: () =>
          'rounded-2xl! bg-primary-background! overflow-hidden! text-current! border border-gray-300! dark:border-gray-600!',
        option: (state) =>
          state.isSelected
            ? 'bg-emerald-green!'
            : state.isFocused
              ? 'bg-emerald-green/50! cursor-pointer!'
              : '',
        singleValue: () => 'text-current!',
      }}
    />
  );
}

export default ChangeComplaintStatus;

'use client';

import { useTranslations } from 'next-intl';
import Select from 'react-select';
import clsx from 'clsx';

import { complaintStatus } from '../models/status';
import { selectorStyles } from '@/core/config/selector-styles';
import { ComplaintStatus } from '../models/complaint';

type StatusSelectProps = { status?: string; required?: boolean };

function StatusSelect({ status, required = false }: StatusSelectProps) {
  const t = useTranslations('complaintsPage.details.statuses');
  const tSelect = useTranslations('select');

  const options = complaintStatus.map((status) => ({
    value: status,
    label: t(`${status}`),
  }));

  return (
    <Select
      required={required}
      isClearable={false}
      inputId="status"
      name="status"
      options={options}
      defaultValue={
        status ? options.find((option) => option.value === status) : undefined
      }
      noOptionsMessage={() => tSelect('noOption')}
      placeholder={tSelect('placeholder')}
      classNames={{
        ...selectorStyles<ComplaintStatus, string>(),
        control: (state) =>
          clsx(
            'focus:ring-emerald-green! py-0.5 transition-none! w-full! rounded-2xl! border! border-gray-200! bg-gray-50! focus:ring-2! focus:outline-0! lg:text-sm! dark:border-gray-700! dark:bg-gray-900!',
            state.isFocused && 'outline-2! outline-emerald-green!',
          ),
      }}
    />
  );
}

export default StatusSelect;

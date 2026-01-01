'use client';

import { useTranslations } from 'next-intl';
import Select from 'react-select';
import clsx from 'clsx';

import { selectorStyles } from '@/core/config/selector-styles';
import type { GovermentalEntities } from '../models/govermental-entities';

type Props = {
  hasDefaultValue?: boolean;
  required?: boolean;
  title: string;
  govermentalEntities: GovermentalEntities | null;
};

function GovermentalEentitySelector({
  title,
  required = true,
  hasDefaultValue = true,
  govermentalEntities,
}: Props) {
  const tSelect = useTranslations('select');

  if (!govermentalEntities) return null;

  const options = govermentalEntities.map((entity) => ({
    value: entity.id.toString(),
    label: entity.name,
  }));

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="govermentalEntity" className="text-sm">
        {title}
      </label>
      <Select
        required={required}
        isClearable={false}
        inputId="govermentalEntityId"
        name="govermentalEntityId"
        options={options}
        noOptionsMessage={() => tSelect('noOption')}
        placeholder={tSelect('placeholder')}
        defaultValue={hasDefaultValue ? options[0] : undefined}
        classNames={{
          ...selectorStyles,
          control: (state) =>
            clsx(
              'focus:ring-emerald-green! py-0.5 transition-none! w-full! rounded-2xl! border! border-gray-200! bg-gray-50! focus:ring-2! focus:outline-0! lg:text-sm! dark:border-gray-700! dark:bg-gray-900!',
              state.isFocused && 'outline-2! outline-emerald-green!',
            ),
        }}
      />
    </div>
  );
}

export default GovermentalEentitySelector;

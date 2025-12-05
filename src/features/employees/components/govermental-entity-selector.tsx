import Select from 'react-select';

import { selectorStyles } from '@/core/config/selector-styles';
import type { GovermentalEntities } from '../models/govermental-entities';
import clsx from 'clsx';

type Props = {
  title: string;
  govermentalEntities: GovermentalEntities | null;
};

function GovermentalEentitySelector({ title, govermentalEntities }: Props) {
  if (!govermentalEntities) return null;

  const options = govermentalEntities.map((entity) => ({
    value: entity.id.toString(),
    label: entity.name,
  }));

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="govermentalEntity">{title}</label>
      <Select
        required
        isClearable={false}
        inputId="govermentalEntity"
        name="govermentalEntity"
        options={options}
        defaultValue={options[0]}
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

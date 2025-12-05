import clsx from 'clsx';
import { GroupBase, type ClassNamesConfig } from 'react-select';

type SelectorStyles =
  | ClassNamesConfig<
      {
        value: string;
        label: string;
      },
      false,
      GroupBase<{
        value: string;
        label: string;
      }>
    >
  | undefined;

export const selectorStyles: SelectorStyles = {
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
};

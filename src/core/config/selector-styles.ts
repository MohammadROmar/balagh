import clsx from 'clsx';
import { GroupBase, type ClassNamesConfig } from 'react-select';

type SelectorStyles<K = string, L = string> =
  | ClassNamesConfig<
      {
        value: K;
        label: L;
      },
      false,
      GroupBase<{
        value: K;
        label: L;
      }>
    >
  | undefined;

export function selectorStyles<K, L>(): SelectorStyles<K, L> {
  return {
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
}

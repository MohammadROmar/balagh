import clsx from 'clsx';
import { ComponentProps } from 'react';

type InputProps = { label: string; error?: string } & ComponentProps<'input'>;

function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={id}
        required
        {...props}
        className={clsx(
          'focus:ring-emerald-green w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800',
          props.className,
        )}
      />

      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

export default Input;

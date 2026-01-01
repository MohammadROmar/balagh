import clsx from 'clsx';
import { ComponentProps } from 'react';

type InputProps = { label: string; error?: string } & ComponentProps<'input'>;

function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>

      <input
        id={id}
        name={id}
        {...props}
        className={clsx('input', props.className)}
      />

      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

export default Input;

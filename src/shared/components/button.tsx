import clsx from 'clsx';
import type { ComponentProps, PropsWithChildren } from 'react';

import LoadingIndicator from '@/assets/icons/loading-indicator';

type ButtonProps = { pending?: boolean } & ComponentProps<'button'> &
  PropsWithChildren;

function Button({ pending, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={pending || props.disabled}
      {...props}
      className={clsx('button', props.className)}
    >
      {pending ? <LoadingIndicator className="w-6" /> : children}
    </button>
  );
}

export default Button;

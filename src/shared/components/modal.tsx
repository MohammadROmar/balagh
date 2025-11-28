'use client';

import {
  useState,
  useEffect,
  type PropsWithChildren,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type ModalProps = ComponentPropsWithRef<'dialog'> & {
  title: string;
  description?: string;
  titleStyles?: string;
  icon?: ReactNode;
} & PropsWithChildren;

function Modal({
  title,
  description,
  titleStyles,
  children,
  icon,
  ...props
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={props.ref}
      aria-modal
      aria-live="polite"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="bg-secondary-background animate-fade-in fixed top-1/2 w-fit -translate-1/2 overflow-visible rounded-2xl border border-gray-300 p-4 text-center backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:supports-backdrop-filter:bg-black/30 max-sm:w-full sm:max-w-lg sm:min-w-md ltr:left-1/2 rtl:right-1/2 rtl:translate-x-1/2 dark:border-gray-600"
      {...props}
    >
      {icon && (
        <div className="mb-2 flex items-center justify-center">{icon}</div>
      )}

      <h4 id="modal-title" className={clsx('text-2xl font-bold', titleStyles)}>
        {title}
      </h4>
      {description && (
        <p
          id="modal-description"
          className="text-secondary mt-1 text-sm whitespace-pre-wrap"
        >
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </dialog>,
    document.getElementById('modals')!,
  );
}

export default Modal;

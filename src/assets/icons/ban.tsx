import { memo, type ComponentPropsWithoutRef } from 'react';

function BanIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4.929 4.929 19.07 19.071" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default memo(BanIcon);

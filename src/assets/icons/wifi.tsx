import { memo, type ComponentPropsWithoutRef } from 'react';

function WifiIcon(props: ComponentPropsWithoutRef<'svg'>) {
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
      <path d="M12 20h.01"></path>
      <path d="M2 8.82a15 15 0 0 1 20 0"></path>
      <path d="M5 12.859a10 10 0 0 1 14 0"></path>
      <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
    </svg>
  );
}

export default memo(WifiIcon);

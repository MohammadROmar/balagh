import { memo, type ComponentPropsWithoutRef } from 'react';

function CheckMarkIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <rect width="24" height="24" fill="currentColor" opacity="0" />
      <path
        fill="currentColor"
        transform="translate(19 6.5) rotate(90)"
        d="M5.341,12.247a1,1,0,0,0,1.317,1.505l4-3.5a1,1,0,0,0,.028-1.48l-9-8.5A1,1,0,0,0,.313,1.727l8.2,7.745Z"
      />
    </svg>
  );
}

export default memo(CheckMarkIcon);

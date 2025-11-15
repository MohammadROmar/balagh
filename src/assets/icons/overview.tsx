import { memo, type ComponentPropsWithoutRef } from 'react';

function OverviewIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden
      {...props}
    >
      <g
        id="Overview"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <rect id="Container" x="0" y="0" width="24" height="24"></rect>
        <path
          d="M19,10.5714286 L19,18 C19,19.1045695 18.1045695,20 17,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,7 C4,5.8954305 4.8954305,5 6,5 L13.4285714,5 L13.4285714,5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0,0"
        ></path>
        <path
          d="M18,7 C18.5522847,7 19,6.55228475 19,6 C19,5.44771525 18.5522847,5 18,5 C17.4477153,5 17,5.44771525 17,6 C17,6.55228475 17.4477153,7 18,7 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0,0"
        ></path>
        <path
          d="M8,15 L11,11 L13.000781,13 L16,9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0,0"
        ></path>
      </g>
    </svg>
  );
}

export default memo(OverviewIcon);

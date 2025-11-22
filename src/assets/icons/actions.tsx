import { memo, type ComponentPropsWithoutRef } from 'react';

function ActionsIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      {...props}
    >
      <path
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth="1.5px"
        d="m10.43 3.39.09-.22a2 2 0 0 1 3.73.16l.07.23A2 2 0 0 0 17 4.8l.21-.09a2 2 0 0 1 2.53 2.75l-.11.21a2 2 0 0 0 1 2.76l.22.09a2 2 0 0 1-.16 3.73l-.23.07A2 2 0 0 0 19.2 17l.09.21a2 2 0 0 1-2.75 2.53l-.21-.11a2 2 0 0 0-2.76 1l-.09.22a2 2 0 0 1-3.73-.16l-.07-.23A2 2 0 0 0 7 19.2l-.21.09a2 2 0 0 1-2.53-2.75l.11-.21a2 2 0 0 0-1-2.76l-.22-.09a2 2 0 0 1 .16-3.73l.23-.07A2 2 0 0 0 4.8 7l-.09-.21a2 2 0 0 1 2.75-2.51l.21.11a2 2 0 0 0 2.76-1Z"
      ></path>
      <circle
        cx="12"
        cy="12"
        r="3.91"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="bevel"
        strokeWidth="1.5px"
      ></circle>
    </svg>
  );
}

export default memo(ActionsIcon);

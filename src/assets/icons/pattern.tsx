import { memo, type ComponentPropsWithoutRef } from 'react';

function PatternIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      aria-hidden
      {...props}
    >
      <polygon
        fill="currentColor"
        points="0,200 0,160 40,160 40,120 80,120 80,140 120,140 120,100 160,100 160,130 200,130 200,90 240,90 240,110 280,110 280,80 320,80 320,120 360,120 360,70 400,70 400,140 440,140 440,60 480,60 480,150 520,150 520,85 560,85 560,135 600,135 600,75 640,75 640,125 680,125 680,95 720,95 720,145 760,145 760,55 800,55 800,165 840,165 840,105 880,105 880,155 920,155 920,85 960,85 960,175 1000,175 1000,115 1040,115 1040,185 1080,185 1080,125 1120,125 1120,195 1200,195 1200,200"
      ></polygon>
    </svg>
  );
}

export default memo(PatternIcon);

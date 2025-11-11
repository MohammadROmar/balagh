import clsx from 'clsx';
import type { ElementType } from 'react';

type FloatingIconProps = {
  icon: ElementType;
  animationDelay?: string;
  className: string;
};

function FloatingIcon({
  icon: Icon,
  animationDelay,
  className,
}: FloatingIconProps) {
  return (
    <div className={clsx('absolute', className)}>
      <div
        className="animate-float rounded-2xl bg-white/15 p-4 backdrop-blur-sm"
        style={{ animationDelay }}
      >
        <Icon className="size-5" />
      </div>
    </div>
  );
}

export default FloatingIcon;

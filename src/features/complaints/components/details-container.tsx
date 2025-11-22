import type { ElementType, PropsWithChildren } from 'react';

type Props = {
  title: string;
  icon: ElementType;
} & PropsWithChildren;

function ComplaintDetailsContainer({ title, icon: Icon, children }: Props) {
  return (
    <section className="bg-secondary-background h-fit rounded-2xl border border-gray-300 p-4 shadow dark:border-gray-600">
      <div className="flex items-center gap-2">
        <Icon className="text-emerald-green size-5" />
        <h3 className="text-heading text-xl font-semibold">{title}</h3>
      </div>
      <hr className="my-4 text-gray-300 dark:text-gray-600" />

      {children}
    </section>
  );
}

export default ComplaintDetailsContainer;

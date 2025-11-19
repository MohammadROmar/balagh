import Breadcrumbs from './breadcrumbs';

type PageTitleProps = { title: string };

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <h2 className="text-heading text-4xl font-bold">{title}</h2>
      <Breadcrumbs />
    </>
  );
}

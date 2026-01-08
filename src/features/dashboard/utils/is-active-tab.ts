export function isActiveTab(pathname: string, href: string) {
  const pathnameParts = pathname.split('/').filter(Boolean);
  const hrefParts = href.split('/').filter(Boolean);

  const navigatesTo = hrefParts[1] ?? hrefParts[0];

  if (
    (navigatesTo === 'admin' || navigatesTo === 'dashboard') &&
    pathnameParts.length === 1
  ) {
    return true;
  }

  return pathnameParts[1] === navigatesTo;
}

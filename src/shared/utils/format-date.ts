export function formatDate(date: Date, locale: string) {
  const formattedDate = date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
}

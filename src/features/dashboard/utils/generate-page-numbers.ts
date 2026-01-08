export function generatePageNumbers(
  current: number,
  total: number,
  maxButtons: number,
): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];

  if (total <= maxButtons) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    const siblings = Math.floor((maxButtons - 3) / 2);
    let left = Math.max(2, current - siblings);
    let right = Math.min(total - 1, current + siblings);

    if (current - 1 <= siblings) {
      right = 1 + 2 * siblings;
    }
    if (total - current <= siblings) {
      left = total - 2 * siblings;
    }

    pages.push(1);
    if (left > 2) pages.push('ellipsis');
    for (let page = left; page <= right; page++) {
      pages.push(page);
    }
    if (right < total - 1) pages.push('ellipsis');
    pages.push(total);
  }

  return pages;
}

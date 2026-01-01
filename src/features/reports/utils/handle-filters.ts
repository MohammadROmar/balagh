export function handleFilters(target: EventTarget & HTMLFormElement) {
  const formData = new FormData(target);

  const params = new URLSearchParams();

  Object.entries(Object.fromEntries(formData)).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'string' && value.trim().length === 0) return;

    params.set(key, String(value));
  });

  return params.toString();
}

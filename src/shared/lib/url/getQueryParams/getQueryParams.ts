/**
 * get query params from the URL
 */

export function getQueryParams() {
  const { search } = window.location;

  return new URLSearchParams(search);
}

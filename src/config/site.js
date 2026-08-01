/**
 * Canonical site origin.
 *
 * Must be a build-time constant, not `window.location.origin`: during static
 * prerendering there is no `window`, and reading it at render time crashes the
 * build. Keeping it hardcoded also stops preview deployments from
 * self-canonicalising to their own throwaway domain.
 */
export const SITE_URL = 'https://warengjayateknik.my.id';

/**
 * Build an absolute URL from a site-relative path.
 * @param {string} path - Path beginning with '/'
 * @returns {string} Absolute URL
 */
export const absoluteUrl = (path = '/') => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

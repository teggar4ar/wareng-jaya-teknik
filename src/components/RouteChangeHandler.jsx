import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles what a browser normally does on navigation but a SPA does not:
 * reset scroll, move keyboard focus into the new page, and announce the new
 * page to screen readers.
 *
 * Only the live region is rendered; everything else happens in an effect so
 * this is safe during static prerendering (no browser globals at render time).
 */
const RouteChangeHandler = () => {
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  // The first render is a fresh page load, where the browser already puts focus
  // at the document start and the screen reader reads the page itself.
  const isInitialLoad = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const main = document.getElementById('konten-utama');
    if (!main) return;

    const heading = main.querySelector('h1');
    const target = heading || main;

    // Headings aren't focusable by default; -1 allows programmatic focus
    // without adding them to the tab order.
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    const label = (heading?.textContent || document.title || '').trim();
    if (label) setAnnouncement(`Halaman ${label} dimuat`);
  }, [pathname]);

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
};

export default RouteChangeHandler;

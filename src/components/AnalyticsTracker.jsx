import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Pastikan fungsi gtag ada di window (sudah dimuat dari index.html)
    if (typeof window.gtag === 'function') {
      // Kirim event 'page_view' setiap kali lokasi berubah
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]); // Jalankan efek ini setiap kali 'location' berubah

  return null; // Komponen ini tidak merender apapun
};

export default AnalyticsTracker;

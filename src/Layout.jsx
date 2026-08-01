import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import RouteChangeHandler from './components/RouteChangeHandler';
import WhatsAppButton from './components/WhatsAppButton';
import AnalyticsTracker from './components/AnalyticsTracker';
import { ThemeProvider } from './contexts/ThemeContext';

/**
 * Root layout shared by every route. Rendered both in the browser and during
 * static prerendering, so it must not touch browser-only globals at render time.
 */
const Layout = () => {
  return (
    <ThemeProvider>
      <RouteChangeHandler />
      <div className="min-h-screen flex flex-col bg-paper text-ink transition-colors duration-200">
        <AnalyticsTracker />
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-btn focus:bg-accent focus:px-4 focus:font-mono focus:text-sm focus:font-medium focus:uppercase focus:tracking-wider focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten-utama" className="flex-grow pt-16 md:pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <StructuredData />
    </ThemeProvider>
  );
};

export default Layout;

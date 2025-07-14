import React, { useContext, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import AnalyticsTracker from './components/AnalyticsTracker';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectGalleryPage = lazy(() => import('./pages/ProjectGalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
        <AnalyticsTracker />
        <Header />
        <main className="flex-grow pt-16 md:pt-20">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<ProjectGalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <StructuredData />
    </Router>
  );
}

export default App;


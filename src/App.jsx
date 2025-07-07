import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeContext } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import ServicesPage from './pages/ServicesPage';
import ProjectGalleryPage from './pages/ProjectGalleryPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import StructuredData from './components/StructuredData';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
        <Header />
        <main className="flex-grow pt-16 md:pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<ProjectGalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <StructuredData />
    </Router>
  );
}

export default App;


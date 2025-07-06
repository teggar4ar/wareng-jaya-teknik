import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaBars, FaTimes, FaTools } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  // Determine if link is active
  const isActive = (path) => location.pathname === path;
  
  // Animation variants
  const navItemVariants = {
    hover: { scale: 1.05, y: -2 }
  };
  
  return (
    <header 
      className={`fixed w-full z-50 ${scrolled ? 'py-2' : 'py-4'} 
      ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900/95 via-slate-800/95 to-gray-900/95' 
        : 'bg-gradient-to-r from-blue-700/95 via-blue-600/95 to-blue-500/95'} 
      text-white shadow-lg transition-all duration-300 backdrop-blur-sm
      ${scrolled ? 'border-b border-opacity-20' : ''}
      ${theme === 'dark' ? 'border-gray-600' : 'border-blue-400'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-700'}`}
          >
            <FaTools size={20} className="text-white" />
          </motion.div>
          <span className="text-xl md:text-2xl font-extrabold tracking-tight group-hover:tracking-normal transition-all duration-300">
            Wareng Jaya Teknik
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <motion.button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-6">
            {[
              { path: "/", label: "Beranda" },
              { path: "/about", label: "Tentang Kami" },
              { path: "/services", label: "Layanan" },
              { path: "/gallery", label: "Galeri" },
              { path: "/blog", label: "Blog" },
              { path: "/contact", label: "Kontak" }
            ].map((item) => (
              <li key={item.path}>
                <motion.div
                  whileHover="hover"
                  variants={navItemVariants}
                >
                  <Link 
                    to={item.path} 
                    className={`relative px-3 py-2 rounded-lg transition duration-200
                      ${isActive(item.path) 
                        ? `${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-700'} font-medium` 
                        : 'hover:bg-white/10'}`}
                    aria-label={`Navigasi ke halaman ${item.label}`}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded"
                        layoutId="underline"
                      />
                    )}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <ThemeToggle />
          </motion.div>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div 
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden
        ${theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900/95 to-gray-800/95' 
          : 'bg-gradient-to-b from-blue-600/95 to-blue-500/95'} 
        backdrop-blur-sm`}
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="container mx-auto px-4 pb-5">
          <ul className="space-y-2 py-4">
            {[
              { path: "/", label: "Beranda" },
              { path: "/about", label: "Tentang Kami" },
              { path: "/services", label: "Layanan" },
              { path: "/gallery", label: "Galeri" },
              { path: "/blog", label: "Blog" },
              { path: "/contact", label: "Kontak" }
            ].map((item, index) => (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
                transition={{ delay: 0.05 * index }}
              >
                <Link 
                  to={item.path} 
                  className={`block py-3 px-4 rounded-lg ${isActive(item.path) 
                    ? `${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-700'} font-medium` 
                    : 'hover:bg-white/10'}`}
                  onClick={handleLinkClick}
                  aria-label={`Navigasi ke halaman ${item.label}`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="pt-2 px-4 flex items-center">
            <span className="mr-3">Tema:</span>
            <ThemeToggle />
          </div>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
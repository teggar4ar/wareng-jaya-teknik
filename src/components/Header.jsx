import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, useReducedMotion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { path: '/', label: 'Beranda' },
  { path: '/about', label: 'Tentang Kami' },
  { path: '/services', label: 'Layanan' },
  { path: '/gallery', label: 'Galeri' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Kontak' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) =>
    `relative inline-flex min-h-11 items-center px-1 font-mono text-sm font-medium uppercase tracking-wider transition-colors duration-150 ${
      isActive(path)
        ? 'text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent'
        : 'text-ink-muted hover:text-ink'
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        <Link
          to="/"
          className="font-display text-lg font-semibold uppercase tracking-tight text-ink md:text-xl"
        >
          Wareng Jaya Teknik
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={linkClasses(item.path)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {isMenuOpen ? <FaTimes size={22} aria-hidden="true" /> : <FaBars size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        className="overflow-hidden border-b border-line bg-paper md:hidden"
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
      >
        <nav aria-label="Navigasi seluler">
          <ul className="mx-auto w-full max-w-6xl space-y-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex min-h-11 items-center border-l-2 px-4 font-mono text-sm font-medium uppercase tracking-wider transition-colors duration-150 ${
                    isActive(item.path)
                      ? 'border-accent text-accent'
                      : 'border-transparent text-ink-muted hover:text-ink'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  tabIndex={isMenuOpen ? undefined : -1}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;

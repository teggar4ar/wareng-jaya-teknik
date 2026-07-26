import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-btn border border-line bg-surface text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
      aria-label={theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
    >
      {theme === 'dark' ? <FaSun size={18} aria-hidden="true" /> : <FaMoon size={18} aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;

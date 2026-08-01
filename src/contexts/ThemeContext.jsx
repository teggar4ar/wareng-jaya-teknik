import React, { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components -- context + provider co-located intentionally; consumers import ThemeContext from here
export const ThemeContext = createContext();

const readStoredTheme = () => {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
  } catch {
    // localStorage unavailable; fall through to default
  }
  return 'light';
};

export const ThemeProvider = ({ children }) => {
  // Always start from 'light' so the first client render matches the
  // prerendered HTML. The real preference is applied in the effect below,
  // while the inline script in index.html sets the <html> class before paint
  // to avoid a flash of the wrong theme.
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = readStoredTheme();
    if (stored !== 'light') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);

    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  }, [theme]);

  // Function to toggle between dark and light modes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

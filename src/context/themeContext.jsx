
/**
 * Contexto de tema y lenguaje para la aplicación.
 * Permite alternar entre modo claro/oscuro y cambiar el idioma global.
 * Utiliza localStorage para persistencia y aplica la clase 'dark' al documento.
 *
 * @module ThemeContext
 */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * Hook para acceder al contexto de tema y lenguaje.
 * @throws Error si se usa fuera de ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Proveedor de tema y lenguaje.
 * Maneja el estado global de tema (claro/oscuro) y lenguaje, y expone funciones para alternar y cambiar.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @returns {JSX.Element} Contexto de tema y lenguaje para la aplicación.
 */
export const ThemeProvider = ({ children }) => {
  // Estado para el tema (claro/oscuro)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return savedTheme;
  });

  // Estado para el idioma global
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  // Aplica la clase 'dark' al documento y guarda el tema en localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Guarda el idioma en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  /**
   * Alterna entre modo claro y oscuro.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Cambia el idioma global.
   * @param {string} newLanguage - Nuevo idioma a establecer.
   */
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};
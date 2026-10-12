import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    const saved = localStorage.getItem('app_lang');
    if (saved && translations[saved]) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result[key] === undefined) {
        return keyPath; // fallback to key path if missing
      }
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

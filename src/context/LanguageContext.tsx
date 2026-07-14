"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "../locales/en";
import { hi } from "../locales/hi";
import { mr } from "../locales/mr";

type Language = "en" | "hi" | "mr";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const translations = { en, hi, mr };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: keyof Translations): string => {
    return translations[language][key] || translations["en"][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
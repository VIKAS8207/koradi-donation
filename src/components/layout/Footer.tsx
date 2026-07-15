"use client";

import { useLanguage } from "../../context/LanguageContext"; // Added context import
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full mt-auto bg-white/30 backdrop-blur-md py-5 px-8 md:px-12 text-xs md:text-sm text-amber-950/80 flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="font-medium tracking-wide">
        © {new Date().getFullYear()} ALL RIGHTS RESERVED.
      </p>
      
      <p className="font-bold tracking-widest uppercase">
        {t('home')}
      </p>
    </footer>
  );
}
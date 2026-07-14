"use client";

import Link from 'next/link';
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="w-full border-b border-gray-800 p-6 flex justify-between items-center bg-[#fdfbf7] relative z-50">
      <div className="text-yellow-500 font-bold text-xl">BRAND</div>
      
      <div className="flex items-center gap-8">
        {/* Translated Links */}
        <div className="flex gap-6 text-sm tracking-widest uppercase text-amber-950 font-bold">
          <Link href="/" className="hover:text-orange-500 transition-colors">{t('home')}</Link>
          <Link href="/form" className="hover:text-orange-500 transition-colors">{t('form')}</Link>
          <Link href="/payment" className="hover:text-orange-500 transition-colors">{t('payment')}</Link>
        </div>

        {/* Language Dropdown */}
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "mr")}
          className="bg-white border border-amber-900/20 text-amber-950 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block px-3 py-2 outline-none shadow-sm cursor-pointer"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>
      </div>
    </nav>
  );
}
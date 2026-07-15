"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext"; // Added context import

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { t } = useLanguage();
  
  // State to manage whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if the user clicks anywhere else on the page
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Language options array
  const languages = [
    { label: "English", value: "en" },
    { label: "हिंदी", value: "hi" },
    { label: "मराठी", value: "mr" }
  ];

  // Find the label for the currently selected language
  const currentLanguageLabel = languages.find(l => l.value === language)?.label || "English";

  return (
    <nav className="w-full mt-auto bg-white/30 backdrop-blur-md py-5 px-8 md:px-12 text-xs md:text-sm text-amber-950/80 flex flex-col md:flex-row justify-between items-center gap-3 relative z-50">
      <p className="font-medium tracking-wide">
        {t('home')}
      </p>
      
      {/* --- 100% Custom Tailwind Dropdown --- */}
      <div className="relative inline-block w-32" ref={dropdownRef}>
        
        {/* Main Dropdown Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white/50 border-transparent text-amber-950 text-sm rounded-full px-4 py-2 outline-none cursor-pointer transition-all hover:bg-amber-200/50 focus:ring-2 focus:ring-orange-400"
        >
          <span className="font-medium">{currentLanguageLabel}</span>
          <svg 
            className={`w-4 h-4 text-amber-900/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        {/* Dropdown Options Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-full bg-[#fffcf5] border border-amber-900/10 rounded-xl shadow-xl overflow-hidden z-50">
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => {
                    setLanguage(lang.value as "en" | "hi" | "mr");
                    setIsOpen(false); // Close menu after selection
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                    language === lang.value 
                      ? "bg-amber-100/80 text-orange-800 font-bold" // Highlight selected option
                      : "text-amber-950 hover:bg-amber-200/50" // Custom hover color for other options
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

    </nav>
  );
}
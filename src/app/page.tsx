"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useLanguage } from "../context/LanguageContext";
import { getTranslatedStates, getTranslatedCities } from "../lib/indiaLocations"; // Import our new library

// ==========================================
// Custom Dropdown Component
// ==========================================
const CustomDropdown = ({ 
  value, 
  onChange, 
  options 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  options: { label: string, value: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage(); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || t('selectOption');

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg bg-white/60 hover:bg-white/80 text-amber-950 font-medium transition-all shadow-sm outline-none flex justify-between items-center border border-amber-900/20 focus:ring-2 focus:ring-orange-500"
      >
        <span className={value ? "text-amber-950" : "text-amber-900/60 truncate mr-2"}>
          {selectedLabel}
        </span>
        
        <div className="flex items-center justify-center w-6 h-6 text-amber-800 shrink-0">
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#fffcf5] rounded-lg shadow-2xl border border-amber-900/10">
          <ul className="max-h-60 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-amber-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-400">
            {options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 cursor-pointer text-amber-950 hover:bg-amber-100/80 hover:text-orange-900 transition-colors font-medium border-b border-amber-900/5 last:border-none"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-amber-950/50 italic text-sm text-center">
                Please select a state first
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function Home() {
  const router = useRouter(); 
  const { t, language } = useLanguage(); // Grab current language from context
  
  const [selectedState, setSelectedState] = useState(""); 
  const [selectedCity, setSelectedCity] = useState(""); 

  // Dynamically load translated states and cities based on current language
  const indiaStatesOptions = getTranslatedStates(language as "en" | "hi" | "mr");
  const cityOptions = getTranslatedCities(selectedState, language as "en" | "hi" | "mr");

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    setSelectedCity(""); // Reset city selection when a new state is selected
  };

  // Simplified navigation: cause logic is removed, goes directly to booking
  const handleSubmitNavigation = () => {
    router.push("/booking");
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-12 space-y-8">
      
      <div className="relative w-full max-w-3xl h-48 md:h-56 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 shadow-lg overflow-hidden border border-amber-700/30 flex items-center">
        <div 
          className="absolute right-0 top-0 h-full w-2/3 md:w-1/2 pointer-events-none"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent 0%, black 70%)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 70%)' 
          }}
        >
          <img 
            src="/images/karodimatha.jpg" 
            alt="Traditional Marigolds" 
            className="object-cover w-full h-full opacity-80 mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 px-8 md:px-12 w-full md:w-2/3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-50 tracking-wide mb-2 drop-shadow-md">
            {t('makeDonation')}
          </h1>
          <p className="text-amber-100 font-medium text-sm md:text-lg tracking-wide drop-shadow-sm">
            {t('fillForm')}
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-50/90 border border-orange-300/50 rounded-xl p-4 md:p-5 shadow-sm text-center relative overflow-hidden backdrop-blur-sm">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-400 to-red-600"></div>
        <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-400 to-red-600"></div>
        <p className="text-amber-950 font-semibold text-sm md:text-base tracking-wide flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-orange-600 animate-pulse shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.66 11.2c-.23-.3-.51-.6-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.56-.16-.99-2.16-1.05-4.82-.04-6.91-.98.71-1.85 1.76-2.39 3.03-1.08 2.56-1 5.66.44 8.01.56.91 1.28 1.68 2.15 2.22C10.02 21.05 11.51 21.5 13 21.5c3.27 0 6.27-2.34 6.81-5.54.19-1.12.01-2.27-.4-3.23-.28-.65-.72-1.35-1.75-1.53z"/>
          </svg>
          {t('navratriNotice')}
        </p>
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-br from-[#fffcf5] via-[#fdf0d5] to-[#f9d788] rounded-xl shadow-xl p-8 md:p-10 relative">
        <div className="absolute inset-3 md:inset-4 border border-amber-900/15 rounded-lg pointer-events-none"></div>

        <form className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('fullName')}</label>
              <input type="text" placeholder={t('enterFullName')} required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('address')}</label>
              <textarea placeholder={t('enterAddress')} rows={2} required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm resize-none outline-none"></textarea>
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('state')}</label>
              <CustomDropdown 
                value={selectedState} 
                onChange={handleStateChange} 
                options={indiaStatesOptions} 
              />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('city')}</label>
              <CustomDropdown 
                value={selectedCity} 
                onChange={setSelectedCity} 
                options={cityOptions} 
              />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('pincode')}</label>
              <input type="text" placeholder={t('pincode')} required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('mobileNumber')}</label>
              <input type="tel" placeholder="+91" required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('emailAddress')}</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>
          </div>

          <hr className="border-amber-900/15 my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-1">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('causeOfDonation')}</label>
              <input 
                type="text" 
                value={t('causeOfDonation')}
                readOnly 
                className="w-full px-4 py-2.5 rounded-lg border font-bold text-sm transition-all shadow-sm outline-none bg-amber-800/10 border-transparent text-amber-900 cursor-not-allowed" 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">{t('donationAmount')}</label>
              {/* Logic removed: Hardcoded to 2100 with read-only state */}
              <input 
                type="number" 
                placeholder={t('enterAmount')} 
                value={2100}
                readOnly
                required
                className="w-full px-4 py-2.5 rounded-lg border font-bold text-lg transition-all shadow-sm outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] bg-amber-800/10 border-transparent text-amber-900 cursor-not-allowed" 
              />
              <p className="text-xs text-red-700 mt-2 font-semibold">
                {t('fixedAmountNotice')}
              </p>
            </div>
          </div>

          <div className="pt-8 pb-2">
            <button 
              type="button" 
              onClick={handleSubmitNavigation}
              className="cursor-pointer w-full md:w-auto px-12 py-3.5 bg-gradient-to-r from-red-700 via-orange-600 to-red-700 bg-[length:200%_auto] text-amber-50 font-bold tracking-widest uppercase rounded-lg border border-red-800 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:bg-[position:right_center] transition-all duration-300 mx-auto flex justify-center"
            >
              {t('bookNow')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
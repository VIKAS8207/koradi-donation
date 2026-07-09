"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; 

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || "Select an option";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg bg-white/60 hover:bg-white/80 text-amber-950 font-medium transition-all shadow-sm outline-none flex justify-between items-center border border-amber-900/20 focus:ring-2 focus:ring-orange-500"
      >
        <span className={value ? "text-amber-950" : "text-amber-900/60"}>
          {selectedLabel}
        </span>
        
        <div className="flex items-center justify-center w-6 h-6 text-amber-800">
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
            {options.map((option) => (
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
            ))}
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
  const [cause, setCause] = useState("");
  const [amount, setAmount] = useState<string | number>("");
  const [selectedState, setSelectedState] = useState(""); 

  const causeOptions = [
    { value: "General Donation", label: "General Donation" },
    { value: "BUILDING FUND", label: "Building Fund" },
    { value: "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA", label: "Akhand Manokamna Jyot Ashwin Navratra" },
    { value: "MANDIR JIRNODHAR", label: "Mandir Jirnodhar" },
    { value: "ANATHALAYA", label: "Anathalaya" },
    { value: "OLD AGE HOME", label: "Old Age Home" },
    { value: "YOGMMEDITATON AND NATUROPATHY CENTRE", label: "Yoga, Meditation and Naturopathy Centre" },
    { value: "Goshala", label: "Goshala" },
  ];

  const indiaStatesOptions = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" }
  ];

  // Fix 1: Only handle state and amount updates here
  const handleCauseChange = (selectedCause: string) => {
    setCause(selectedCause);

    if (selectedCause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA") {
      setAmount(2100);
    } else {
      setAmount(""); 
    }
  };

  // Fix 2: The missing navigation function added here
  const handleSubmitNavigation = () => {
    if (!cause) return alert("Please select a cause.");

    if (cause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA") {
      router.push("/booking");
    } else {
      router.push("/payment");
    }
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
            Make a Donation
          </h1>
          <p className="text-amber-100 font-medium text-sm md:text-lg tracking-wide drop-shadow-sm">
            Fill the form and make your contribution
          </p>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-r from-amber-50/90 via-orange-50/90 to-amber-50/90 border border-orange-300/50 rounded-xl p-4 md:p-5 shadow-sm text-center relative overflow-hidden backdrop-blur-sm">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-400 to-red-600"></div>
        <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-400 to-red-600"></div>
        <p className="text-amber-950 font-semibold text-sm md:text-base tracking-wide flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-orange-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.66 11.2c-.23-.3-.51-.6-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.56-.16-.99-2.16-1.05-4.82-.04-6.91-.98.71-1.85 1.76-2.39 3.03-1.08 2.56-1 5.66.44 8.01.56.91 1.28 1.68 2.15 2.22C10.02 21.05 11.51 21.5 13 21.5c3.27 0 6.27-2.34 6.81-5.54.19-1.12.01-2.27-.4-3.23-.28-.65-.72-1.35-1.75-1.53z"/>
          </svg>
          The Navratri season is going on and "Akhand Manokamna Jyot" is available for bookings.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-br from-[#fffcf5] via-[#fdf0d5] to-[#f9d788] rounded-xl shadow-xl p-8 md:p-10 relative">
        
        <div className="absolute inset-3 md:inset-4 border border-amber-900/15 rounded-lg pointer-events-none"></div>

        <form className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Full Name</label>
              <input type="text" placeholder="Enter your full name" required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Address</label>
              <textarea placeholder="Enter your full address" rows={2} required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm resize-none outline-none"></textarea>
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">City</label>
              <input type="text" placeholder="City" required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">State</label>
              <CustomDropdown
                value={selectedState} 
                onChange={setSelectedState} 
                options={indiaStatesOptions} 
              />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Pincode</label>
              <input type="text" placeholder="Pincode" required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div>
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Mobile Number</label>
              <input type="tel" placeholder="+91" required className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Email Address</label>
              <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-lg border border-amber-900/20 bg-white/60 text-amber-950 font-medium focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-amber-900/40 shadow-sm outline-none" />
            </div>
          </div>

          <hr className="border-amber-900/15 my-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-1">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Cause of Donation</label>
              <CustomDropdown 
                value={cause} 
                onChange={handleCauseChange} 
                options={causeOptions} 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-amber-950 text-sm font-bold mb-1.5 tracking-wide">Donation Amount (₹)</label>
              <input 
                type="number" 
                placeholder="Enter amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={cause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA"}
                required
                className={`w-full px-4 py-2.5 rounded-lg border font-bold text-lg transition-all shadow-sm outline-none
                  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]
                  ${cause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA" 
                    ? "bg-amber-800/10 border-transparent text-amber-900 cursor-not-allowed" 
                    : "bg-white/60 border-amber-900/20 text-amber-950 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  }`} 
              />
              {cause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA" && (
                <p className="text-xs text-red-700 mt-2 font-semibold">
                  * Amount is fixed at ₹2100 for this cause.
                </p>
              )}
            </div>
          </div>

          <div className="pt-8 pb-2">
            <button 
              type="button" 
              onClick={handleSubmitNavigation} // Fix applied here
              className="cursor-pointer w-full md:w-auto px-12 py-3.5 bg-gradient-to-r from-red-700 via-orange-600 to-red-700 bg-[length:200%_auto] text-amber-50 font-bold tracking-widest uppercase rounded-lg border border-red-800 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:bg-[position:right_center] transition-all duration-300 mx-auto flex justify-center"
            >
              {cause === "AKHAND MANOKAMNA JYOT ASHWIN NAVRATRA" ? "Book Now" : "Donate Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
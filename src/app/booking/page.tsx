"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext"; // Import the hook

export default function BookingPage() {
  const router = useRouter();
  const { t } = useLanguage(); // Initialize translation hook
  
  // --- STATE & ALLOCATION ---
  // Exactly 1 Diya allocated to the user
  const [allocatedDiya] = useState<number>(1244);

  return (
    // CHANGED: justify-center to justify-start and added pt-8 md:pt-12 to reduce the top gap
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 md:pt-12 relative w-full font-sans">
      
      {/* CHANGED: Added justify-start here as well for perfect internal alignment */}
      <div className="relative z-10 w-full flex flex-col items-center justify-start p-4 md:p-8 space-y-8">
        
        {/* =========================================
            SECTION 1: Main Header Box
            ========================================= */}
        <div className="relative w-full max-w-5xl h-48 md:h-56 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 shadow-lg overflow-hidden border border-amber-700/30 flex items-center shrink-0">
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
              {t('confirmBooking')}
            </h1>
            <p className="text-amber-100 font-medium text-sm md:text-lg tracking-wide drop-shadow-sm">
              {t('allocationSubtitle')}
            </p>
          </div>
        </div>

        {/* =========================================
            SECTION 2: True CSS Coupon / Ticket
            ========================================= */}
        
        {/* 
          BULLETPROOF CSS MASK: This completely replaces the buggy SVG. 
          It uses pure CSS gradients to "bite" the holes out of the edges. 
        */}
        <style>{`
          .css-ticket-mask {
             -webkit-mask-image: radial-gradient(circle at 0 calc(100% - 220px), transparent 16px, black 17px),
                                 radial-gradient(circle at 100% calc(100% - 220px), transparent 16px, black 17px);
             -webkit-mask-size: 51% 100%, 51% 100%;
             -webkit-mask-position: left, right;
             -webkit-mask-repeat: no-repeat;
             
             mask-image: radial-gradient(circle at 0 calc(100% - 220px), transparent 16px, black 17px),
                         radial-gradient(circle at 100% calc(100% - 220px), transparent 16px, black 17px);
             mask-size: 51% 100%, 51% 100%;
             mask-position: left, right;
             mask-repeat: no-repeat;
          }

          @media (min-width: 768px) {
             .css-ticket-mask {
                -webkit-mask-image: radial-gradient(circle at calc(100% - 300px) 0, transparent 16px, black 17px),
                                    radial-gradient(circle at calc(100% - 300px) 100%, transparent 16px, black 17px);
                -webkit-mask-size: 100% 51%, 100% 51%;
                -webkit-mask-position: top, bottom;
                -webkit-mask-repeat: no-repeat;

                mask-image: radial-gradient(circle at calc(100% - 300px) 0, transparent 16px, black 17px),
                            radial-gradient(circle at calc(100% - 300px) 100%, transparent 16px, black 17px);
                mask-size: 100% 51%, 100% 51%;
                mask-position: top, bottom;
                mask-repeat: no-repeat;
             }
          }
        `}</style>

        {/* The Solid, Visible Ticket Container (bg-white/95 ensures it doesn't vanish) */}
        <div className="css-ticket-mask w-full max-w-5xl bg-[#FFF8E7] backdrop-blur-xl shadow-2xl border border-amber-900/10 flex flex-col md:flex-row relative">
          
          {/* Dashed Perforation Line (aligns perfectly with the CSS cutouts) */}
          <div className="absolute hidden md:block right-[300px] top-4 bottom-4 border-r-[2.5px] border-dashed border-amber-900/30 z-20"></div>
          <div className="absolute block md:hidden bottom-[220px] left-4 right-4 border-b-[2.5px] border-dashed border-amber-900/30 z-20"></div>

          {/* --- LEFT AREA: Details & Image --- */}
          <div className="flex-1 flex flex-col sm:flex-row p-6 md:p-10 gap-6 md:gap-10 items-center sm:items-stretch">
            
            {/* Text Details */}
            <div className="flex flex-col justify-center w-full flex-1">
              <p className="text-xs font-bold text-red-600 mb-2 tracking-widest uppercase">
                {t('shreeMahalaxmi')}
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-amber-950 mb-1">
                {t('jyotTitle')}
              </h2>
              <p className="text-amber-900/70 text-sm font-semibold mb-8">
                {t('templeName')}
              </p>

              <div className="space-y-4 text-amber-950">
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-2">
                  <span className="text-sm font-semibold text-amber-900/60 uppercase tracking-wide">{t('allocatedJyot')}</span>
                  <span className="text-2xl font-black text-green-700">#{allocatedDiya}</span>
                </div>
                <div className="flex justify-between items-center border-b border-amber-900/10 pb-2">
                  <span className="text-sm font-semibold text-amber-900/60 uppercase tracking-wide">{t('duration')}</span>
                  <span className="text-base font-bold bg-amber-100 px-3 py-1 rounded text-amber-900">{t('fiveDays')}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-sm font-semibold text-amber-900/60 uppercase tracking-wide">{t('accessRules')}</span>
                  <span className="text-base font-bold text-amber-900">{t('fiveEntries')}</span>
                </div>
              </div>
            </div>

            
          </div>

          {/* --- RIGHT AREA: Payment Stub --- */}
          <div className="w-full md:w-[300px] h-[220px] md:h-auto p-6 md:p-10 flex flex-col justify-center items-center bg-gray-100">
            
            <div className="w-full text-center mb-6">
              <span className="block text-xs font-bold text-amber-900/50 uppercase tracking-widest mb-2">{t('totalPayable')}</span>
              <div className="flex items-baseline justify-center gap-1 text-orange-600">
                <span className="text-2xl font-medium">₹</span>
                <span className="text-5xl font-extrabold tracking-tight">2,100</span>
              </div>
              <p className="text-xs font-semibold text-amber-950/50 mt-2">{t('flatRate')}</p>
            </div>

            <button 
              onClick={() => router.push("/receipt")}
              className="cursor-pointer w-full py-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold tracking-widest uppercase rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              {t('proceedToPay')}
            </button>
            
            <p className="text-center text-[10px] text-amber-900/40 font-bold uppercase tracking-widest mt-4 flex justify-center items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              {t('secureCheckout')}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
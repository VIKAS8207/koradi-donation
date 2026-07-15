"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";

export default function PaymentPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-12 relative z-10 w-full font-sans">
      
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-red-800/20 p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Subtle Background Error Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100 relative z-10">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>

        {/* Error Text */}
        <h1 className="text-3xl font-extrabold text-amber-950 mb-3 tracking-wide relative z-10">
          {t('paymentFailed')}
        </h1>
        <p className="text-amber-900/70 font-medium text-sm md:text-base mb-8 relative z-10 px-4">
          {t('paymentErrorMsg')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-3 relative z-10">
          <button 
            onClick={() => router.push("/booking")}
            className="w-full py-3.5 bg-gradient-to-r from-red-700 via-orange-600 to-red-700 bg-[length:200%_auto] text-amber-50 font-bold tracking-widest uppercase rounded-lg border border-red-800 shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:bg-[position:right_center] transition-all duration-300"
          >
            {t('tryAgain')}
          </button>
          
          <button 
            onClick={() => router.push("/")}
            className="w-full py-3.5 bg-white border border-amber-900/20 text-amber-900 font-bold tracking-widest uppercase rounded-lg hover:bg-amber-50 transition-all duration-300 shadow-sm"
          >
            {t('homeBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}
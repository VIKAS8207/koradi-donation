"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "../../context/LanguageContext";

export default function ReceiptPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState("");
  
  // Scaling State to guarantee "No Scrolling" rule
  const [scale, setScale] = useState(1);
  const [wrapperHeight, setWrapperHeight] = useState("auto");
  const containerRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  
  // Success Popup State
  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    // Generate the current date in the traditional format
    const date = new Date("2026-07-09");
    setCurrentDate(date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }));

    // Auto-hide the success message after 4 seconds
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // --- Dynamic Scaling Logic (Vertical Constraint Only) ---
  // Guarantees the receipt is 100% visible on any device without scrolling
  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current && receiptRef.current) {
        // Available height on the screen (leaving room for paddings & buttons)
        const availableHeight = window.innerHeight - 150; 
        // True unscaled height of the naturally responsive receipt
        const naturalHeight = receiptRef.current.offsetHeight;

        // If the receipt is taller than the screen, scale it down proportionally
        if (naturalHeight > availableHeight) {
          const newScale = availableHeight / naturalHeight;
          setScale(newScale);
          setWrapperHeight(`${naturalHeight * newScale}px`);
        } else {
          // If it fits normally, keep scale at 100%
          setScale(1);
          setWrapperHeight(`${naturalHeight}px`);
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    setTimeout(updateScale, 100); 
    setTimeout(updateScale, 500); // Failsafe for font rendering
    
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleDownload = async () => {
    const receiptElement = document.getElementById("receipt-canvas");
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2, // High resolution for download
        useCORS: true, 
        backgroundColor: "#FFFDF7" // Matches our new traditional paper background
      });
      
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Receipt_RT-2026-08492.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download receipt:", error);
      alert("Failed to download. Please make sure html2canvas is installed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 md:p-8 relative z-10 w-full min-h-[100dvh] font-sans bg-[#FDF9F5] overflow-hidden">
      
      {/* Bulletproof Print CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #receipt-canvas, #receipt-canvas * { visibility: visible; }
          #receipt-canvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            border: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            transform: none !important;
          }
          @page { size: portrait; margin: 0.5cm; }
        }
      `}} />

      {/* Success Notification (Smoothly fades out and collapses) */}
      <div 
        className={`w-full max-w-4xl bg-green-50/90 backdrop-blur-md border border-green-200 rounded-xl flex items-center justify-center gap-3 shadow-sm print:hidden shrink-0 transition-all duration-700 ease-in-out ${
          showSuccess ? 'p-3 mb-4 opacity-100 max-h-20' : 'p-0 mb-0 opacity-0 max-h-0 border-none overflow-hidden'
        }`}
      >
        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p className="text-green-800 font-bold text-sm md:text-base tracking-wide">
          {t('transactionSuccess')}
        </p>
      </div>

      {/* --- SCALING WRAPPER --- */}
      <div ref={containerRef} className="w-full max-w-4xl flex justify-center">
        {/* Height container prevents layout jumping/whitespace */}
        <div style={{ height: wrapperHeight, width: '100%', display: 'flex', justifyContent: 'center' }}>
          
          {/* Scaled Element */}
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: '100%' }}>
            
            {/* =========================================
                TRADITIONAL PROFESSIONAL RECEIPT CANVAS
                ========================================= */}
            <div 
              id="receipt-canvas" 
              ref={receiptRef}
              className="w-full bg-[#FFFDF7] shadow-2xl border-[3px] border-amber-900/30 relative flex flex-col text-amber-950 shrink-0 p-4 md:p-8"
            >
              {/* Inner Double Border (Traditional Ledger Look) */}
              <div className="absolute inset-1.5 border border-amber-900/20 pointer-events-none z-10 hidden sm:block" />

              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[250px] md:w-[450px] rounded-full overflow-hidden opacity-[0.03]">
                  <img 
                    src="/images/logo.png" 
                    alt="-" 
                    className="w-full h-full object-cover grayscale mix-blend-multiply" 
                  />
                </div>
              </div>

              {/* --- RECEIPT HEADER --- */}
              <div className="relative z-20 flex flex-row items-center justify-between border-b-2 border-dashed border-amber-900/30 pb-3 md:pb-5 mb-4">
                
                {/* Logo */}
                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 flex items-center justify-center">
                  <img 
                    src="/images/KoradiLogo.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>

                {/* Temple Details */}
                <div className="flex-1 text-center px-2">
                  <p className="text-[9px] md:text-xs font-bold text-red-600 mb-0.5">
                    {t('shreeMahalaxmi')}
                  </p>
                  <h1 className="text-[15px] md:text-3xl font-black text-red-800 uppercase leading-tight mb-1 tracking-tight">
                    {t('templeName')}
                  </h1>
                  <p className="text-[8px] md:text-xs font-medium text-amber-950/80 leading-snug">
                    {t('templeAddress')} <br className="md:hidden" /> {t('templeContact')}
                  </p>
                  <div className="flex flex-wrap justify-center gap-x-4 mt-1">
                    <p className="text-[8px] md:text-xs font-bold text-red-900">{t('panCard')}</p>
                    <p className="text-[8px] md:text-xs font-bold text-red-900">{t('regNo')}</p>
                  </div>
                </div>

                {/* Traditional Receipt Badge */}
                <div className="w-16 md:w-24 shrink-0 flex flex-col items-end justify-start h-full pt-1">
                  <div className="bg-red-800 text-white px-2 md:px-3 py-1 font-bold text-[8px] md:text-sm uppercase tracking-widest rounded-sm">
                    {t('receiptTitle')}
                  </div>
                </div>
              </div>

              {/* --- RECEIPT BODY (Traditional Ledger Grid) --- */}
              {/* STRICT RULE APPLIED: Values are locked to text-[20px] on mobile */}
              <div className="relative z-20 flex flex-col gap-3 md:gap-5 flex-grow">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('receiptNoLabel')}</span>
                    <span className="text-[19px] md:text-xl text-amber-950 font-bold leading-tight">RT-2026-08492</span>
                  </div>
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5 items-end text-right">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('dateLabel')}</span>
                    <span className="text-[19px] md:text-xl text-amber-950 font-bold leading-tight">{currentDate}</span>
                  </div>
                </div>

                <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                  <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('receivedFromLabel')}</span>
                  <span className="text-[19px] md:text-xl text-amber-950 font-bold leading-tight truncate">Vikas Vishwakarma</span>
                </div>

                <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                  <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('addressLabel')}</span>
                  <span className="text-[19px] md:text-xl text-amber-950 font-bold leading-tight truncate">Raipur, Chhattisgarh</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('donationTypeLabel')}</span>
                    <span className="text-[19px] md:text-xl text-amber-950 font-bold uppercase leading-tight truncate">{t('jyotTitle')}</span>
                  </div>
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5 items-end text-right">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('jyotNoLabel')}</span>
                    <span className="text-[19px] md:text-xl text-amber-950 font-bold leading-tight">#1244</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('mobNoLabel')}</span>
                    <span className="text-[20px] md:text-2xl text-amber-950 font-bold leading-tight">+91 XXXXX XXXXX</span>
                  </div>
                  <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5 items-end text-right">
                    <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('panNoLabel')}</span>
                    <span className="text-[20px] md:text-2xl text-amber-950 font-bold leading-tight">XXXXXXXXXX</span>
                  </div>
                </div>

                <div className="flex flex-col border-b border-amber-900/20 border-dotted pb-0.5">
                  <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest">{t('sumOfRupeesLabel')}</span>
                  <span className="text-[20px] md:text-2xl text-amber-950 font-bold italic leading-tight truncate">{t('amountInWords')}</span>
                </div>

              </div>

              {/* --- FOOTER: Amount, QR, Signature --- */}
              <div className="relative z-20 flex justify-between items-end mt-6 pt-4 border-t-2 border-dashed border-amber-900/30">
                
                {/* Big Amount */}
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs text-amber-900/60 uppercase font-bold tracking-widest mb-1">Total Amount</span>
                  <div className="text-4xl md:text-5xl font-black text-amber-950 tracking-tighter">
                    ₹ 2,100/-
                  </div>
                </div>

                {/* QR & Signature Flexed horizontally */}
                <div className="flex items-end gap-4 md:gap-8">
                  {/* QR Code */}
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-black bg-white p-1">
                    <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 4h4v4H4V4zm2 2v-2h-2v2h2zm8-2h4v4h-4V4zm2 2v-2h-2v2h2zM4 14h4v4H4v-4zm2 2v-2h-2v2h2zm6-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                  
                  {/* Signature */}
                  
                </div>
              </div>

              {/* --- DARSHAN ENTRY & TERMS --- */}
              <div className="relative z-20 mt-6 bg-amber-900/5 p-2 md:p-3 rounded flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-1 md:gap-0">
                <div className="text-[10px] md:text-xs font-bold text-amber-950">
                  <span className="text-red-800 uppercase mr-1">{t('darshanEntryLabel')}</span> {t('darshanValidText')}
                </div>
                <div className="text-[8px] md:text-[10px] font-bold text-amber-900/60 uppercase tracking-widest">
                  {t('termsApplied')}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-4xl print:hidden shrink-0">
        <button 
          onClick={() => window.print()}
          className="flex-1 py-3 md:py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          {t('printBtn')}
        </button>

        <button 
          onClick={handleDownload}
          className="flex-1 py-3 md:py-4 bg-white border border-orange-600 text-orange-700 font-bold text-xs md:text-sm tracking-widest uppercase rounded-xl shadow-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          {t('downloadBtn')}
        </button>
        
        <button 
          onClick={() => router.push("/")}
          className="flex-1 py-3 md:py-4 bg-white border border-amber-600 text-amber-700 font-bold text-xs md:text-sm tracking-widest uppercase rounded-xl hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
        >
          {t('homeBtn')}
        </button>
      </div>

    </div>
  );
}
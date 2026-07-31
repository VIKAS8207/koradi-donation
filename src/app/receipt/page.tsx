"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import { useLanguage } from "../../context/LanguageContext";

export default function ReceiptPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState("");
  
  // --- SINGLE SOURCE OF TRUTH FOR WIDTH ---
  const RECEIPT_WIDTH = 1050;

  // Scaling State
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

  // --- Dynamic Scaling Logic to fit screen perfectly ---
  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current && receiptRef.current) {
        // 1. Available width in the parent container
        const availableWidth = containerRef.current.clientWidth;
        
        // 2. Available height on the screen 
        // (Viewport height minus padding and buttons space)
        const availableHeight = window.innerHeight - 200;
        
        // 3. True unscaled height of the receipt
        const unscaledHeight = receiptRef.current.offsetHeight;

        // Calculate scales for both dimensions using the synced RECEIPT_WIDTH
        const widthScale = availableWidth / RECEIPT_WIDTH;
        const heightScale = availableHeight / unscaledHeight;

        // Take the smallest scale to ensure it fits BOTH horizontally and vertically. Cap at 1 (100%).
        const newScale = Math.min(widthScale, heightScale, 1);
        setScale(newScale);

        // Adjust the wrapper height so we don't have empty whitespace below the scaled receipt
        setWrapperHeight(`${unscaledHeight * newScale}px`);
      }
    };

    // Run on mount and when fonts/images finish loading
    updateScale();
    window.addEventListener("resize", updateScale);
    // Slight delay to ensure content has rendered before final height measurement
    setTimeout(updateScale, 100); 
    
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleDownload = async () => {
    const receiptElement = document.getElementById("receipt-canvas");
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2, // High resolution for download
        useCORS: true, 
        backgroundColor: "#FCF8EB" 
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
    // min-h-[100dvh] ensures it fits the mobile viewport perfectly
    <div className="flex flex-col items-center justify-center p-4 md:p-8 relative z-10 w-full min-h-[100dvh] font-sans bg-[#FDF9F5] overflow-hidden">
      
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
          @page { size: landscape; margin: 0.5cm; }
        }
      `}} />

      {/* Success Notification (Smoothly fades out and collapses) */}
      <div 
        className={`w-full max-w-[1050px] bg-green-50/90 backdrop-blur-md border border-green-200 rounded-xl flex items-center justify-center gap-3 shadow-sm print:hidden shrink-0 transition-all duration-700 ease-in-out ${
          showSuccess ? 'p-3 mb-4 md:mb-6 opacity-100 max-h-20' : 'p-0 mb-0 opacity-0 max-h-0 border-none overflow-hidden'
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
      <div ref={containerRef} className="w-full max-w-[1050px] flex justify-center">
        {/* Height container prevents layout jumping/whitespace */}
        <div style={{ height: wrapperHeight, width: '100%', display: 'flex', justifyContent: 'center' }}>
          
          {/* Scaled Element */}
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            
            {/* =========================================
                STRICT FIXED-PIXEL RECEIPT CANVAS (Synced to 1050)
                ========================================= */}
            <div 
              id="receipt-canvas" 
              ref={receiptRef}
              style={{ width: `${RECEIPT_WIDTH}px` }}
              className="bg-[#FCF8EB] rounded-2xl shadow-2xl border border-red-800/20 relative overflow-hidden p-10 flex flex-col text-amber-950 shrink-0"
            >
              
              {/* Background Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[450px] h-[450px] rounded-full overflow-hidden opacity-[0.03]">
                  <img 
                    src="/images/logo.png" 
                    alt="-" 
                    className="w-full h-full object-cover grayscale mix-blend-multiply" 
                  />
                </div>
              </div>

              {/* --- RECEIPT HEADER --- */}
              <div className="relative z-10 w-full shrink-0">
                <div className="text-sm text-red-800 font-bold w-full text-left mb-4">
                  {t('regNo')}
                </div>

                <div className="flex items-center gap-6 w-full">
                  {/* Logo */}
                  <div className="w-28 h-28 shrink-0 flex items-center justify-center">
                    <img 
                      src="/images/KoradiLogo.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  {/* Temple Details */}
                  <div className="flex-1 text-center flex flex-col justify-center">
                    <p className="text-base font-bold text-red-600 mb-1">
                      {t('shreeMahalaxmi')}
                    </p>
                    <h1 className="text-4xl font-black text-red-800 uppercase leading-tight mb-2 tracking-tight">
                      {t('templeName')}
                    </h1>
                    <p className="text-sm font-semibold text-amber-950/80 mt-1">
                      {t('templeAddress')}
                    </p>
                    <p className="text-sm font-semibold text-amber-950/80">
                      {t('templeContact')}
                    </p>
                    <p className="text-sm font-bold text-red-900 mt-2">
                      {t('panCard')}
                    </p>
                    <p className="text-[11px] text-amber-950/60 mt-0.5">
                      {t('exemptNo')}
                    </p>
                  </div>
                </div>

                {/* Receipt Title */}
                <div className="text-center text-xl font-bold tracking-widest text-red-800 border-y border-red-800/20 my-6 py-2 uppercase">
                  {t('receiptTitle')}
                </div>
              </div>

              {/* --- RECEIPT BODY (Strict Two-Column) --- */}
              <div className="flex flex-row w-full relative z-10 text-2xl font-medium flex-grow gap-6 mb-6">
                
                {/* LEFT COLUMN (65%) */}
                <div className="flex flex-col w-[65%] h-full pr-6 space-y-4">
                  <div className="flex items-center">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('receiptNoLabel')}</span>
                    <span className="font-bold">: RT-2026-08492</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('receivedFromLabel')}</span>
                    <span className="font-bold">: Vikas Vishwakarma</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('addressLabel')}</span>
                    <span className="font-bold">: Raipur, Chhattisgarh</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('donationTypeLabel')}</span>
                    <span className="font-bold uppercase">: {t('jyotTitle')}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('mobNoLabel')}</span>
                    <span className="font-bold">: +91 XXXXX XXXXX</span>
                  </div>
                  <div className="flex items-start mt-2">
                    <span className="w-45 text-amber-900/70 font-semibold shrink-0">{t('sumOfRupeesLabel')}</span>
                    <span className="font-bold italic leading-snug text-[16px]">: {t('amountInWords')}</span>
                  </div>

                  {/* Amount & Signature */}
                  <div className="mt-auto pt-10 flex justify-between items-end w-full">
                    <div className="text-4xl font-bold text-amber-950">
                      ₹ 2,100/-
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (35%) */}
                <div className="flex flex-col w-[35%] pl-6 border-l border-amber-900/10 h-full space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-amber-900/70 font-semibold shrink-0">{t('dateLabel')}</span>
                    <span className="font-bold">: {currentDate}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-amber-900/70 font-semibold shrink-0">{t('jyotNoLabel')}</span>
                    <span className="font-bold">: #1244</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-amber-900/70 font-semibold shrink-0">{t('panNoLabel')}</span>
                    <span className="font-bold">: XXXXXXXXXX</span>
                  </div>
                  
                  {/* QR Code */}
                  <div className="flex flex-col items-end mt-auto flex-grow justify-end pb-2">
                    <div className="w-36 h-36 border-2 border-black bg-white p-2 flex items-center justify-center">
                      <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h4v4H4V4zm2 2v-2h-2v2h2zm8-2h4v4h-4V4zm2 2v-2h-2v2h2zM4 14h4v4H4v-4zm2 2v-2h-2v2h2zm6-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>

              {/* --- DARSHAN ENTRY & TERMS --- */}
              <div className="w-full flex flex-col border-t border-amber-900/10 pt-4 shrink-0 relative z-10">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-sm w-[500px]">
                    <span className="uppercase mr-2 text-red-800">{t('darshanEntryLabel')}</span> {t('darshanValidText')}
                  </div>
                  <div className="text-sm font-bold text-amber-950/70 italic">
                    {t('carryReceiptNote')}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-[1050px] print:hidden shrink-0">
        <button 
          onClick={() => window.print()}
          className="flex-1 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          {t('printBtn')}
        </button>

        <button 
          onClick={handleDownload}
          className="flex-1 py-4 bg-white border border-orange-600 text-orange-700 font-bold text-sm tracking-widest uppercase rounded-xl shadow-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          {t('downloadBtn')}
        </button>
        
        <button 
          onClick={() => router.push("/")}
          className="flex-1 py-4 bg-white border border-amber-600 text-amber-700 font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
        >
          {t('homeBtn')}
        </button>
      </div>

    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas"; // Added for downloading the image
import { useLanguage } from "../../context/LanguageContext"; // Added context import

export default function ReceiptPage() {
  const router = useRouter();
  const { t } = useLanguage(); // Initialize translation hook
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Generate the current date in the traditional format
    const date = new Date("2026-07-09");
    setCurrentDate(date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }));
  }, []);

  // --- NEW: Download Function ---
  const handleDownload = async () => {
    const receiptElement = document.getElementById("receipt-canvas");
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement, {
        scale: 2, // Doubles the resolution for a crisp image
        useCORS: true, // Ensures local images load properly in the canvas
        backgroundColor: "#FCF8EB" // Matches your receipt background
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
    <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full space-y-6 overflow-auto font-sans">
      
      {/* --- NEW: Bulletproof Print CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-canvas, #receipt-canvas * {
            visibility: visible;
          }
          #receipt-canvas {
            position: absolute;
            left: 0;
            top: 0;
            transform: translate(-50%);
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: landscape;
            margin: 0;
          }
        }
      `}} />

      {/* Success Notification - Hidden when printing */}
      <div className="w-full max-w-2xl bg-green-50/90 backdrop-blur-md border border-green-200 rounded-xl p-3 flex items-center justify-center gap-3 shadow-sm print:hidden shrink-0">
        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p className="text-green-800 font-bold text-sm tracking-wide">
          {t('transactionSuccess')}
        </p>
      </div>

      {/* Main Container Wrapper */}
      <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-amber-900/10 p-4 flex flex-col items-center shrink-0 print:p-0 print:border-none print:shadow-none print:bg-transparent">
        
        {/* =========================================
            STRICT 640x386 RECEIPT CANVAS
            ========================================= */}
        <div id="receipt-canvas" className="w-[640px] h-[386px] shrink-0 bg-[#FCF8EB] rounded shadow-md border border-red-800/20 relative overflow-hidden p-4 flex flex-col text-amber-950">
          
          {/* Mild Image Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden opacity-[0.03]">
              <img 
                src="/images/logo.png" 
                alt="Watermark" 
                className="w-full h-full object-cover grayscale mix-blend-multiply" 
              />
            </div>
          </div>

          {/* --- RECEIPT HEADER --- */}
          <div className="relative z-10 w-full shrink-0">
            {/* Top Registration Number */}
            <div className="text-[7px] text-red-800 font-bold w-full text-left mb-1">
              {t('regNo')}
            </div>

            <div className="flex items-center gap-3 w-full">
              {/* Square Space for Logo on the Left */}
              <div className="w-[60px] h-[60px] shrink-0 flex items-center justify-center">
                <img 
                  src="/images/KoradiLogo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* Exact Text from Reference Image */}
              <div className="flex-1 text-center flex flex-col justify-center">
                <p className="text-[8px] font-bold text-red-600 mb-0.5">
                  {t('shreeMahalaxmi')}
                </p>
                <h1 className="text-[13px] font-black text-red-800 uppercase leading-tight">
                  {t('templeName')}
                </h1>
                <p className="text-[7px] font-semibold text-amber-950/80 mt-0.5">
                  {t('templeAddress')}
                </p>
                <p className="text-[7px] font-semibold text-amber-950/80">
                  {t('templeContact')}
                </p>
                <p className="text-[7px] font-bold text-red-900 mt-0.5">
                  {t('panCard')}
                </p>
                <p className="text-[6px] text-amber-950/60 mt-0.5">
                  {t('exemptNo')}
                </p>
              </div>
            </div>

            {/* Clean Centered Receipt Title */}
            <div className="text-center text-[10px] font-bold tracking-widest text-red-800 border-y border-red-800/20 my-2.5 py-0.5 uppercase">
              {t('receiptTitle')}
            </div>
          </div>

          {/* =========================================
              NEW: STRICT TWO-COLUMN RECEIPT BODY 
              ========================================= */}
          <div className="flex flex-row w-full relative z-10 px-2 text-[9px] font-medium mt-1 flex-grow">
            
            {/* LEFT COLUMN (65% Width) */}
            <div className="flex flex-col space-y-2.5 w-[65%]">
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('receiptNoLabel')}</span>
                <span className="font-bold">: RT-2026-08492</span>
              </div>
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('receivedFromLabel')}</span>
                <span className="font-bold">: Vikas Vishwakarma</span>
              </div>
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('addressLabel')}</span>
                <span className="font-bold">: Raipur, Chhattisgarh</span>
              </div>
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('donationTypeLabel')}</span>
                <span className="font-bold uppercase">: {t('jyotTitle')}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('mobNoLabel')}</span>
                <span className="font-bold">: +91 XXXXX XXXXX</span>
              </div>
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">{t('sumOfRupeesLabel')}</span>
                <span className="font-bold italic">: {t('amountInWords')}</span>
              </div>
            </div>

            {/* RIGHT COLUMN (35% Width) */}
            <div className="flex flex-col space-y-2.5 w-[35%] pl-2">
              <div className="flex">
                <span className="w-14 text-amber-900/70 font-semibold shrink-0">{t('dateLabel')}</span>
                <span className="font-bold">: {currentDate}</span>
              </div>
              <div className="flex">
                <span className="w-14 text-amber-900/70 font-semibold shrink-0">{t('jyotNoLabel')}</span>
                <span className="font-bold">: #1244</span>
              </div>
              <div className="flex">
                <span className="w-14 text-amber-900/70 font-semibold shrink-0">{t('panNoLabel')}</span>
                <span className="font-bold">: XXXXXXXXXX</span>
              </div>
              {/* QR Code placed directly below PAN with proper alignment */}
              <div className="flex mt-1">
                <span className="w-14 shrink-0"></span>
                <div className="pl-1">
                  <div className="w-12 h-12 border border-black bg-white p-0.5 flex items-center justify-center">
                    <svg className="w-full h-full text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 4h4v4H4V4zm2 2v-2h-2v2h2zm8-2h4v4h-4V4zm2 2v-2h-2v2h2zM4 14h4v4H4v-4zm2 2v-2h-2v2h2zm6-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================
              BOTTOM ROW: AMOUNT & SIGNATURE
              ========================================= */}
          <div className="flex justify-between items-end w-full mt-auto pb-2 px-2 relative z-10">
            <div className="text-lg font-bold text-amber-950 flex items-center">
              ₹ 2,100/-
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-px bg-amber-900/40 mb-1"></div>
              <span className="text-[7px] font-bold uppercase tracking-wider text-amber-900/70">{t('receiverSignature')}</span>
            </div>
          </div>

          {/* --- DARSHAN ENTRY & TERMS --- */}
          <div className="w-full flex flex-col border-t border-amber-900/10 pt-1.5 shrink-0 relative z-10">
            <div className="flex justify-between items-center">
              <div className=" font-bold text-[8px] px-2 py-0.5 ">
                <span className="uppercase mr-1">{t('darshanEntryLabel')}</span> {t('darshanValidText')}
              </div>
              <div className="text-[7px] font-bold text-amber-950/70 italic">
                {t('carryReceiptNote')}
              </div>
            </div>
            <div className="text-[5px] text-amber-900/40 text-right mt-1 uppercase tracking-widest">
              {t('termsApplied')}
            </div>
          </div>

        </div>

        {/* Action Buttons - Hidden when printing */}
        <div className="mt-6 flex gap-4 w-[640px] print:hidden shrink-0">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            {t('printBtn')}
          </button>

          <button 
            onClick={handleDownload}
            className="flex-1 py-2.5 bg-white border border-orange-600 text-orange-700 font-bold text-sm tracking-widest uppercase rounded-lg shadow-sm hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            {t('downloadBtn')}
          </button>
          
          <button 
            onClick={() => router.push("/")}
            className="flex-1 py-2.5 bg-white border border-amber-600 text-amber-700 font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
          >
            {t('homeBtn')}
          </button>
        </div>

      </div>
    </div>
  );
}
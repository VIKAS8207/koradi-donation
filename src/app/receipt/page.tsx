"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReceiptPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Generate the current date in the traditional format
    const date = new Date("2026-07-09"); // Current date context
    setCurrentDate(date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }));
  }, []);

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full space-y-6">
      
      {/* Success Notification - Hidden when printing */}
      <div className="w-full max-w-4xl bg-green-50/90 backdrop-blur-md border border-green-200 rounded-xl p-4 flex items-center justify-center gap-3 shadow-sm print:hidden">
        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p className="text-green-800 font-bold text-lg tracking-wide">
          Transaction Successful! Your receipt has been generated.
        </p>
      </div>

      {/* Main Glassy Container */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-900/10 p-6 md:p-10 flex flex-col items-center">
        
        {/* The Digital Receipt "Paper" - Removed font-serif to use default font */}
        <div className="w-full max-w-3xl bg-[#FCF8EB] rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.05)] border-2 border-red-800/20 relative overflow-hidden p-6 md:p-10 text-amber-950">
          
          {/* Mild Image Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden opacity-[0.04]">
              <img 
                src="/images/karodimatha.jpg" 
                alt="Watermark" 
                className="w-full h-full object-cover grayscale mix-blend-multiply" 
              />
            </div>
          </div>

          {/* Receipt Header (Matching Physical Copy exactly) */}
          <div className="relative text-center border-b-2 border-red-800/20 pb-6 mb-6">
            
            

            <p className="text-xs font-bold text-red-600 mb-1 tracking-widest uppercase">
              !! Shree Mahalaxmi Namha !!
            </p>
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-red-800 tracking-wide mb-2 uppercase" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.5)" }}>
              Shree Mahalaxmi Jagdamba Sansthan, Koradi
            </h1>
            
            <div className="text-xs md:text-sm font-semibold text-amber-950/80 space-y-1">
              <p>Dist. Nagpur - 441111, M.: 9607979333</p>
              <p>website : www.koraditemple.com, E-mail : koraditemple@gmail.com</p>
              <p>No. PN / CIT (EXEMPT.) / TECH / 80G / 720 / 2017-18 / 580</p>
              <div className="flex justify-between items-start text-[10px] md:text-xs font-bold text-red-700/70 mt-2">
              <span><p className="font-bold text-red-900">PAN : AACTS5663H</p></span>
              <span className="bg-red-50 px-3 py-1 rounded-full border border-red-100">Reg. No. A-533 (NGP)</span>
            </div>
            </div>

            {/* Receipt Title with styled lines */}
            <div className="flex items-center justify-center mt-4">
              <div className="h-px bg-red-800/30 flex-grow max-w-[100px]"></div>
              <h2 className="text-xl md:text-2xl font-bold text-red-800 px-4 tracking-widest uppercase">
                Receipt
              </h2>
              <div className="h-px bg-red-800/30 flex-grow max-w-[100px]"></div>
            </div>
          </div>

          {/* Receipt Form Fields */}
          <div className="space-y-6 text-sm md:text-base font-medium relative z-10">
            
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex gap-2">
                <span className="text-amber-900/70">Receipt No.</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 min-w-[150px]">
                  RT-2026-08492
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-amber-900/70">Date:</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 min-w-[150px]">
                  {currentDate}
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-2 w-full">
              <span className="text-amber-900/70 whitespace-nowrap">Received with thanks from</span>
              <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 w-full">
                Vikas Vishwakarma
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-2 w-full">
                <span className="text-amber-900/70">Address:</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 w-full">
                  Raipur, Chhattisgarh
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="text-amber-900/70">PAN No.</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 min-w-[150px]">
                  XXXXXXXXXX
                </span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-2 w-full">
                <span className="text-amber-900/70 whitespace-nowrap">Type of Donation:</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 w-full">
                  Akhand Manokamna Jyot Ashwin Navratra
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                <span className="text-amber-900/70">Mob No.</span>
                <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 min-w-[150px]">
                  +91 XXXXX XXXXX
                </span>
              </div>
            </div>

            {/* Row 5: UPDATED DIYA ALLOCATION FIELD */}
            <div className="flex gap-2 w-full items-center bg-orange-50/50 p-2 rounded-md border border-orange-200 flex-wrap md:flex-nowrap">
              <span className="text-orange-900/80 font-bold whitespace-nowrap flex items-center gap-1">
                Allocated Diya No:
              </span>
              <span className="font-extrabold text-orange-700 px-2 w-full tracking-wider flex items-center gap-2 flex-wrap">
                #1244, #1245, #1246, #1247, #1248
                <span className="text-xs font-semibold text-orange-900/60 tracking-normal bg-orange-100/50 px-2 py-0.5 rounded">
                  (Valid for 5 Days - 5 Entries/Day)
                </span>
              </span>
            </div>

            {/* Row 6 */}
            <div className="flex gap-2 w-full">
              <span className="text-amber-900/70 whitespace-nowrap">The sum of Rupees:</span>
              <span className="font-bold border-b border-amber-900/30 pb-0.5 px-2 w-full italic">
                Two Thousand One Hundred Only
              </span>
            </div>

          </div>

          {/* Receipt Footer */}
          <div className="mt-12 flex justify-between items-end relative z-10">
            <div className="flex items-center">
              <span className="text-4xl font-light text-red-800 mr-4">₹</span>
              <div className="border-2 border-red-800/80 rounded-md px-6 py-2 bg-white/50 font-extrabold text-xl tracking-wider text-amber-950">
                2,100/-
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-px bg-amber-900/50 w-48 mb-2"></div>
              <span className="text-amber-900/70 font-bold text-sm">Receiver's Signature</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Hidden when printing */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-lg print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Receipt
          </button>
          
          <button 
            onClick={() => router.push("/")}
            className="flex-1 py-3.5 bg-white border border-amber-600 text-amber-700 font-bold tracking-widest uppercase rounded-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
          >
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
}
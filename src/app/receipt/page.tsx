"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReceiptPage() {
  const router = useRouter();
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

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full space-y-6 overflow-auto font-sans">
      
      {/* Success Notification - Hidden when printing */}
      <div className="w-full max-w-2xl bg-green-50/90 backdrop-blur-md border border-green-200 rounded-xl p-3 flex items-center justify-center gap-3 shadow-sm print:hidden shrink-0">
        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p className="text-green-800 font-bold text-sm tracking-wide">
          Transaction Successful! Your receipt has been generated.
        </p>
      </div>

      {/* Main Container Wrapper */}
      <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-amber-900/10 p-4 flex flex-col items-center shrink-0 print:p-0 print:border-none print:shadow-none print:bg-transparent">
        
        {/* =========================================
            STRICT 540x356 RECEIPT CANVAS (PDF Ready)
            ========================================= */}
        <div className="w-[640px] h-[356px] shrink-0 bg-[#FCF8EB] rounded shadow-md border border-red-800/20 relative overflow-hidden p-4 flex flex-col text-amber-950">
          
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
              Reg. No. A-533 (NGP)
            </div>

            <div className="flex items-center gap-3 w-full">
              {/* Circular Space for Logo on the Left */}
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-red-800/20 bg-white flex items-center justify-center">
                <img 
                  src="/images/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Exact Text from Reference Image */}
              <div className="flex-1 text-center flex flex-col justify-center">
                <p className="text-[8px] font-bold text-red-600 mb-0.5">
                  !! Shree Mahalaxmi Namha !!
                </p>
                <h1 className="text-[13px] font-black text-red-800 uppercase leading-tight">
                  Shree Mahalaxmi Jagdamba Sansthan, Koradi
                </h1>
                <p className="text-[7px] font-semibold text-amber-950/80 mt-0.5">
                  Dist. Nagpur - 441111, M.: 9607979555/333/111
                </p>
                <p className="text-[7px] font-semibold text-amber-950/80">
                  website: www.koraditemple.com, E-mail: koraditemple@gmail.com
                </p>
                <p className="text-[7px] font-bold text-red-900 mt-0.5">
                  PAN: AACTS5663H
                </p>
                <p className="text-[6px] text-amber-950/60 mt-0.5">
                  No. PN / CIT (EXEMPT.) / TECH/80G/720/2017-18/580
                </p>
              </div>
            </div>

            {/* Clean Centered Receipt Title */}
            <div className="text-center text-[10px] font-bold tracking-widest text-red-800 border-y border-red-800/20 my-2.5 py-0.5 uppercase">
              Receipt
            </div>
          </div>

          {/* --- RECEIPT BODY (Perfect Line-by-Line Symmetry) --- */}
          <div className="flex flex-col space-y-2.5 text-[9px] font-medium w-full relative z-10 px-2 flex-grow">
            
            {/* Line 1: Receipt No & Date */}
            <div className="flex justify-between w-full">
              <div className="flex w-1/2">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">Receipt No.</span>
                <span className="font-bold">: RT-2026-08492</span>
              </div>
              <div className="flex w-1/2 justify-end">
                <span className="w-10 text-amber-900/70 font-semibold shrink-0">Date</span>
                <span className="font-bold">: {currentDate}</span>
              </div>
            </div>

            {/* Line 2: Received with thanks from */}
            <div className="flex w-full">
              <span className="w-36 text-amber-900/70 font-semibold shrink-0">Received with thanks from</span>
              <span className="font-bold">: Vikas Vishwakarma</span>
            </div>

            {/* Line 3: Address */}
            <div className="flex w-full">
              <span className="w-36 text-amber-900/70 font-semibold shrink-0">Address</span>
              <span className="font-bold">: Raipur, Chhattisgarh</span>
            </div>

            {/* Line 4: Type of Donation & Jyot Number */}
            <div className="flex justify-between w-full items-center">
              <div className="flex">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">Type of Donation</span>
                <span className="font-bold uppercase">: Akhand Manokamna Jyot</span>
              </div>
              <div className="flex items-center">
                <span className="w-22 text-amber-900/70 font-semibold shrink-0">Jyot No.</span>
                <span className="font-bold">: #1244</span>
              </div>
            </div>

            {/* Line 5: Mobile & PAN */}
            <div className="flex justify-between w-full">
              <div className="flex w-1/2">
                <span className="w-36 text-amber-900/70 font-semibold shrink-0">Mob No.</span>
                <span className="font-bold">: +91 XXXXX XXXXX</span>
              </div>
              <div className="flex w-1/2 justify-end">
                <span className="w-14 text-amber-900/70 font-semibold shrink-0">PAN No.</span>
                <span className="font-bold">: XXXXXXXXXX</span>
              </div>
            </div>

            {/* Gap before the final section */}
            <div className="h-1"></div> 

            {/* Line 6: Sum of Rupees (Words) */}
            <div className="flex w-full">
              <span className="w-36 text-amber-900/70 font-semibold shrink-0">The sum of Rupees</span>
              <span className="font-bold italic">: Two Thousand One Hundred Only</span>
            </div>
            
            {/* Line 7: Amount & Signature */}
            <div className="flex justify-between items-end w-full mt-auto pb-2">
              <div className="text-lg font-bold text-amber-950 flex items-center">
                ₹ 2,100/-
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 h-px bg-amber-900/40 mb-1"></div>
                <span className="text-[7px] font-bold uppercase tracking-wider text-amber-900/70">Receiver's Signature</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons - Hidden when printing */}
        <div className="mt-6 flex gap-4 w-[540px] print:hidden shrink-0">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-sm tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print
          </button>
          
          <button 
            onClick={() => router.push("/")}
            className="flex-1 py-2.5 bg-white border border-amber-600 text-amber-700 font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  );
}
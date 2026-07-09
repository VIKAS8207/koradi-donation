"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  
  // --- STATE ---
  // CHANGE 2: Default state set to 5
  const [ticketCount, setTicketCount] = useState<number>(5);

  // --- SIMULATED ALLOCATION ---
  const STARTING_DIYA_NUMBER = 1244; 
  
  const allocatedDiyas = useMemo(() => {
    return Array.from({ length: ticketCount }, (_, i) => STARTING_DIYA_NUMBER + i);
  }, [ticketCount]);

  // --- VISUALIZER GRID LOGIC (7 Rows x 10 Cols = 70 items) ---
  const VISUAL_START_INDEX = 32;
  const totalGridItems = 70;

  return (
    <div className="flex-grow flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full space-y-8">
      
      {/* SECTION 1: Main Header Box */}
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
            Confirm Booking
          </h1>
          <p className="text-amber-100 font-medium text-sm md:text-lg tracking-wide drop-shadow-sm">
            Akhand Manokamna Jyot Allocation
          </p>
        </div>
      </div>

      {/* SECTIONS 2 & 3: Main Content Area */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SECTION 2: The Booking Visualizer */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#fffcf5] via-[#fdf0d5] to-[#f9d788] rounded-xl shadow-xl border border-amber-900/10 flex flex-col overflow-hidden relative">
          <div className="absolute inset-3 border border-amber-900/15 rounded-lg pointer-events-none z-20"></div>
          
          {/* Visualizer Header & Controls */}
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-amber-900/10 relative z-30 bg-white/40 backdrop-blur-sm">
            <div>
              <h2 className="text-xl font-bold text-amber-950">Visual Representation</h2>
              <p className="text-sm text-amber-900/70 font-medium">Sequential placement illustration</p>
            </div>
            
            {/* +/- Controls */}
            <div className="flex items-center bg-white/80 p-1.5 rounded-lg shadow-sm border border-amber-900/20">
              <button 
                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                disabled={ticketCount <= 1}
                className="w-10 h-10 flex items-center justify-center bg-amber-50 text-orange-600 font-bold rounded-md disabled:opacity-40 transition-colors hover:bg-orange-100 disabled:hover:bg-amber-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg>
              </button>
              <span className="w-12 text-center text-amber-950 font-extrabold text-xl">
                {ticketCount}
              </span>
              <button 
                onClick={() => setTicketCount(prev => Math.min(5, prev + 1))}
                disabled={ticketCount >= 5}
                className="w-10 h-10 flex items-center justify-center bg-amber-50 text-orange-600 font-bold rounded-md disabled:opacity-40 transition-colors hover:bg-orange-100 disabled:hover:bg-amber-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          </div>

          {/* Grid Visualizer */}
          <div className="flex-grow p-8 flex items-center justify-center relative bg-white/20">
            <div 
              className="w-full max-w-md pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
              }}
            >
              <div className="grid grid-cols-10 gap-2 md:gap-3 py-4">
                {Array.from({ length: totalGridItems }).map((_, index) => {
                  const isSelected = index >= VISUAL_START_INDEX && index < VISUAL_START_INDEX + ticketCount;
                  const isBooked = index < VISUAL_START_INDEX; 
                  
                  let blockStyle = "bg-white border-amber-200 opacity-50"; 
                  let svgColor = "text-amber-300";
                  
                  if (isSelected) {
                    blockStyle = "bg-gradient-to-br from-green-400 to-green-600 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] scale-110 z-10";
                    svgColor = "text-white drop-shadow-md";
                  } else if (isBooked) {
                    blockStyle = "bg-gray-200 border-gray-300 opacity-60";
                    svgColor = "text-gray-400";
                  }

                  return (
                    <div 
                      key={index} 
                      className={`aspect-square rounded-md border flex items-center justify-center transition-all duration-500 ${blockStyle}`}
                    >
                      <svg className={`w-3 h-3 md:w-4 md:h-4 ${svgColor}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C12 2 8 7 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7 12 2 12 2Z" />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Allocation Details */}
        <div className="lg:col-span-1 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-amber-900/10 flex flex-col relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-red-600"></div>
          
          <div className="p-6 md:p-8 flex-grow">
            <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Allocation Details
            </h2>

            <div className="space-y-6">
              
              {/* CHANGE 1 & 3: Fixed height container with dashed placeholders */}
              <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-900/10">
                <span className="block text-xs font-bold text-amber-900/60 uppercase tracking-wider mb-2">Allocated Diya Numbers</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const isAllocated = index < ticketCount;
                    return isAllocated ? (
                      <span key={`diya-${index}`} className="bg-white border border-amber-200 text-amber-950 font-bold px-3 py-1.5 rounded-md shadow-sm">
                        #{STARTING_DIYA_NUMBER + index}
                      </span>
                    ) : (
                      <span key={`empty-${index}`} className="bg-transparent border border-dashed border-amber-900/20 text-amber-900/40 font-medium px-3 py-1.5 rounded-md">
                        Empty
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* CHANGE 4: Fixed Price Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-amber-900/80 font-medium text-sm">
                  <span>Booking Package</span>
                  <span>Up to 5 Diyas</span>
                </div>
                <div className="flex justify-between text-amber-900/80 font-medium text-sm">
                  <span>Selected Quantity</span>
                  <span>{ticketCount} / 5</span>
                </div>
                <div className="border-t border-dashed border-amber-900/20 pt-3 flex justify-between items-end">
                  <span className="text-amber-950 font-bold">Flat Rate Total</span>
                  <span className="text-2xl font-extrabold text-orange-600">₹2,100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6 pt-0">
            <button 
              onClick={() => router.push("/receipt")}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold tracking-widest uppercase rounded-lg shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:scale-[1.02] transition-all"
            >
              Confirm Booking
            </button>
            <p className="text-center text-xs text-amber-900/50 mt-4 font-medium flex justify-center items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Secure Transaction
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
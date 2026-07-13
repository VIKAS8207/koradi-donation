"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  
  // --- STATE & ALLOCATION ---
  // Allow user to book multiple diyas
  const [ticketCount, setTicketCount] = useState<number>(1);
  const STARTING_DIYA_NUMBER = 1244; 

  const allocatedDiyas = useMemo(() => {
    return Array.from({ length: ticketCount }, (_, i) => STARTING_DIYA_NUMBER + i);
  }, [ticketCount]);

  // --- VISUALIZER GRID LOGIC ---
  const totalGridItems = 121; // 11x11 Grid for perfect symmetry
  const targetIndex = 60; // The center of the 11x11 grid
  const startIndex = targetIndex; // Starts at center, fills to the right

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
        
        {/* SECTION 2: The Booking Visualizer (Left - 2 Columns) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#fffcf5] via-[#fdf0d5] to-[#f9d788] rounded-xl shadow-xl border border-amber-900/10 flex flex-col overflow-hidden relative">
          <div className="absolute inset-3 border border-amber-900/15 rounded-lg pointer-events-none z-20"></div>
          
          {/* Visualizer Header & Controls */}
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-amber-900/10 relative z-30 bg-white/40 backdrop-blur-sm">
            <div>
              <h2 className="text-xl font-bold text-amber-950">Your Allocated Jyot</h2>
              <p className="text-sm text-amber-900/70 font-medium">Sequential grid representation</p>
            </div>
            
            {/* +/- Quantity Controls */}
            <div className="flex items-center bg-white/80 p-1.5 rounded-lg shadow-sm border border-amber-900/20">
              <button 
                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                disabled={ticketCount <= 1}
                className="w-8 h-8 flex items-center justify-center bg-amber-50 text-orange-600 font-bold rounded-md disabled:opacity-40 transition-colors hover:bg-orange-100 disabled:hover:bg-amber-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path></svg>
              </button>
              <span className="w-10 text-center text-amber-950 font-extrabold text-lg">
                {ticketCount}
              </span>
              <button 
                onClick={() => setTicketCount(prev => Math.min(50, prev + 1))} // Capped at 50 to prevent layout overflow
                disabled={ticketCount >= 50}
                className="w-8 h-8 flex items-center justify-center bg-amber-50 text-orange-600 font-bold rounded-md disabled:opacity-40 transition-colors hover:bg-orange-100 disabled:hover:bg-amber-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          </div>

          {/* Clean, Elegant Grid Visualizer (Wall-to-wall with Radial Fade) */}
          <div className="flex-grow flex items-center justify-center relative bg-white/20 min-h-[300px]">
            <div 
              className="absolute inset-0 w-full h-full scale-110 pointer-events-none flex items-center justify-center"
              style={{
                maskImage: 'radial-gradient(circle at center, black 25%, transparent 75%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 25%, transparent 75%)'
              }}
            >
              {/* Forced 11-column grid to maintain perfect symmetry */}
              <div className="grid grid-cols-11 gap-2 md:gap-3 lg:gap-4 w-150 h-full p-4 place-content-center">
                {Array.from({ length: totalGridItems }).map((_, index) => {
                  const isSelected = index >= startIndex && index < startIndex + ticketCount;
                  const isBooked = index < startIndex; 
                  
                  let blockStyle = "bg-white/60 border-amber-200/60"; 
                  let content = null;
                  
                  if (isSelected) {
                    const currentDiya = allocatedDiyas[index - startIndex];
                    
                    blockStyle = "border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)] scale-[1.3] z-10 text-white overflow-hidden";
                    
                    content = (
                      <>
                        <img 
                          src="/images/diya.jpg" 
                          alt="Diya" 
                          className="absolute inset-0 w-full h-full object-cover z-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-700 via-transparent to-transparent z-10"></div>
                        <span className="absolute bottom-1 md:bottom-1.5 text-[8px] md:text-[10px] font-extrabold leading-none tracking-wider whitespace-nowrap drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] z-20">
                          #{currentDiya}
                        </span>
                      </>
                    );
                  } else if (isBooked) {
                    blockStyle = "bg-amber-900/10 border-amber-900/10";
                  }

                  return (
                    <div 
                      key={index} 
                      className={`relative w-full aspect-square rounded-md md:rounded-lg border flex items-center justify-center transition-all duration-300 ${blockStyle}`}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Minimal Legend */}
          <div className="bg-white/60 border-t border-amber-900/10 p-5 flex flex-wrap justify-center gap-6 relative z-30">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-amber-900/10 border border-amber-900/10"></div>
               <span className="text-xs font-semibold text-amber-900/70">Booked</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
               <span className="text-xs font-bold text-amber-950">Your Jyot(s)</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-white/60 border border-amber-200/60"></div>
               <span className="text-xs font-semibold text-amber-900/70">Available</span>
             </div>
          </div>
        </div>

        {/* SECTION 3: Allocation Details (Right - Bill Design) */}
        <div className="lg:col-span-1 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-amber-900/10 flex flex-col relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-red-600"></div>
          
          <div className="p-6 md:p-8 flex-grow">
            <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Allocation Bill
            </h2>

            <div className="space-y-6">
              
              {/* Highlighted & Scrollable Diya Number Box */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex flex-col shadow-sm">
                <span className="text-sm font-bold text-green-900 uppercase tracking-wider mb-3">Allocated Diya(s)</span>
                
                {/* Custom scrollbar class to keep things neat if many diyas are booked */}
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-green-100 [&::-webkit-scrollbar-thumb]:bg-green-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                  {allocatedDiyas.map(num => (
                    <span key={num} className="bg-white border border-green-300 text-green-700 font-bold px-3 py-1.5 rounded-md shadow-sm text-sm">
                      #{num}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-amber-900/80 font-medium text-sm border-b border-amber-900/10 pb-3">
                  <span>Booking Type</span>
                  <span className="font-bold text-amber-950 text-right">Akhand Manokamna Jyot</span>
                </div>
                
                <div className="flex justify-between items-start text-amber-900/80 font-medium text-sm border-b border-amber-900/10 pb-3">
                  <span>Access Rules</span>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="font-bold text-amber-950 bg-amber-100 px-2 py-0.5 rounded text-xs">Valid for 5 Days</span>
                    <span className="font-bold text-amber-950 bg-orange-100 px-2 py-0.5 rounded text-xs">5 Entries per Day</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-amber-900/80 font-medium text-sm">
                  <span>Price per Diya</span>
                  <span className="font-bold text-amber-950">₹2,100</span>
                </div>

                <div className="flex justify-between items-center text-amber-900/80 font-medium text-sm pb-3 border-b border-amber-900/10">
                  <span>Quantity</span>
                  <span className="font-bold text-amber-950">x {ticketCount}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-end bg-orange-50/50 p-3 rounded-lg border border-orange-100 shadow-inner">
                  <span className="text-amber-950 font-bold">Total Amount</span>
                  <span className="text-3xl font-extrabold text-orange-600">₹{(ticketCount * 2100).toLocaleString('en-IN')}</span>
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
              Proceed to Pay ₹{(ticketCount * 2100).toLocaleString('en-IN')}
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
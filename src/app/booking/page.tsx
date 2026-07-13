"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  
  // --- STATE & ALLOCATION ---
  // A single diya is allocated to the user
  const [allocatedDiya] = useState<number>(1244);

  // --- VISUALIZER GRID LOGIC (Exact Center Calculation) ---
  const totalGridItems = 121; // 11x11 Grid for perfect symmetry
  const targetIndex = 60; // Index 60 is exactly in the middle of 121 items

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
          
          {/* Visualizer Header */}
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-amber-900/10 relative z-30 bg-white/40 backdrop-blur-sm">
            <div>
              <h2 className="text-xl font-bold text-amber-950">Your Allocated Jyot</h2>
              <p className="text-sm text-amber-900/70 font-medium">Sequential grid representation</p>
            </div>
            <div className="bg-orange-100 text-orange-800 border border-orange-200 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
              Status: Reserved
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
              <div className="grid grid-cols-11 gap-2 md:gap-3 lg:gap-4 w-full h-full p-4 place-content-center">
                {Array.from({ length: totalGridItems }).map((_, index) => {
                  const isSelected = index === targetIndex;
                  const isBooked = index < targetIndex; 
                  
                  let blockStyle = "bg-white/60 border-amber-200/60"; 
                  let content = null;
                  
                  if (isSelected) {
                    // Added overflow-hidden and combined the image with a transparent-to-green gradient
                    blockStyle = "border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)] scale-[1.3] z-10 text-white overflow-hidden bg-cover bg-center bg-[linear-gradient(to_bottom,transparent_10%,#16a34a_95%),url('/images/diya.jpg')]";
                    
                    // Added a drop-shadow to the text to ensure it pops beautifully against the green
                    content = (
                      <span className="absolute bottom-1 md:bottom-1.5 text-[8px] md:text-[10px] font-extrabold leading-none tracking-wider whitespace-nowrap drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        #{allocatedDiya}
                      </span>
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
               <span className="text-xs font-bold text-amber-950">Your Jyot</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-sm bg-white/60 border border-amber-200/60"></div>
               <span className="text-xs font-semibold text-amber-900/70">Available</span>
             </div>
          </div>
        </div>

        {/* SECTION 3: Allocation Details (Right - 1 Column) */}
        <div className="lg:col-span-1 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-amber-900/10 flex flex-col relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 to-red-600"></div>
          
          <div className="p-6 md:p-8 flex-grow">
            <h2 className="text-xl font-bold text-amber-950 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Allocation Details
            </h2>

            <div className="space-y-6">
              
              {/* Highlighted Diya Number Box */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center justify-between shadow-sm">
                <span className="text-sm font-bold text-green-900 uppercase tracking-wider">Allocated Diya</span>
                <span className="bg-white border border-green-300 text-green-700 font-extrabold px-4 py-2 rounded-md shadow-sm text-lg">
                  #{allocatedDiya}
                </span>
              </div>

              {/* Rules & Price Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-amber-900/80 font-medium text-sm border-b border-amber-900/10 pb-3">
                  <span>Booking Type</span>
                  <span className="font-bold text-amber-950 text-right">Akhand Manokamna Jyot</span>
                </div>
                
                {/* Updated Validity Rules */}
                <div className="flex justify-between items-start text-amber-900/80 font-medium text-sm border-b border-amber-900/10 pb-3">
                  <span>Access Rules</span>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="font-bold text-amber-950 bg-amber-100 px-2 py-0.5 rounded text-xs">Valid for 5 Days</span>
                    <span className="font-bold text-amber-950 bg-orange-100 px-2 py-0.5 rounded text-xs">5 Entries per Day</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-amber-900/80 font-medium text-sm pb-1">
                  <span>Flat Rate Fee</span>
                  <span className="font-bold text-amber-950">₹2,100</span>
                </div>
                
                <div className="border-t border-dashed border-amber-900/20 pt-4 flex justify-between items-end bg-orange-50/50 p-3 rounded-lg">
                  <span className="text-amber-950 font-bold">Total Amount</span>
                  <span className="text-3xl font-extrabold text-orange-600">₹2,100</span>
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
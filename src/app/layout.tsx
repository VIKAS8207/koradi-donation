import type { Metadata } from "next";
import "./globals.css";
// import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PhysicsBackground from "../components/layout/PhysicsBackground";

export const metadata: Metadata = {
  title: "Traditional Environment",
  description: "Enterprise level setup with traditional aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        suppressHydrationWarning 
        className="min-h-screen flex flex-col antialiased bg-[#fdfbf7] text-amber-950 selection:bg-orange-400 selection:text-white"
      >
        {/* Global Traditional "Living" Background Container */}
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fffcf5]">
          
          {/* Layer 1: The Breathing Divine Aura (Animated Radial Gradients) */}
          {/* Top Right Saffron Glow */}
          <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400/20 via-orange-300/5 to-transparent animate-[pulse_8s_ease-in-out_infinite_alternate] blur-3xl"></div>
          
          {/* Bottom Left Marigold/Golden Glow */}
          <div className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-yellow-500/5 to-transparent animate-[pulse_12s_ease-in-out_infinite_alternate-reverse] blur-3xl"></div>

          {/* Center Sandalwood Portal Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/80 via-transparent to-transparent pointer-events-none"></div>

          {/* Layer 2: Slow-Rotating Temple Jaali (Lattice) Texture */}
          <div 
            className="absolute inset-[-50%] opacity-[0.025] pointer-events-none mix-blend-multiply animate-[spin_240s_linear_infinite]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 80c-22.091 0-40-17.909-40-40S17.909 0 40 0s40 17.909 40 40-17.909 40-40 40zm0-2c20.987 0 38-17.013 38-38S60.987 2 40 2 2 19.013 2 40s17.013 38 38 38zm0-18c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20zm0-2c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18z' fill='%2378350f' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px',
              backgroundPosition: 'center center'
            }}
          ></div>

          {/* Layer 3: The Falling Flowers (Physics Layer) */}
          <PhysicsBackground />

          {/* Layer 4: Subtle Vignette to frame the form perfectly */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(120,53,15,0.05)] pointer-events-none"></div>
        </div>

        {/* Global UI Components */}
        <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
          {/* <div className="pointer-events-auto w-full"><Navbar /></div> */}
          
          <main className="flex-grow flex flex-col pointer-events-auto">
            {children}
          </main>
          
          <div className="pointer-events-auto w-full mt-auto">
            <Footer />
          </div> 
        </div>
      </body>
    </html>
  );
}
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-800 p-6 flex justify-between items-center">
      <div className="text-yellow-500 font-bold text-xl">BRAND</div>
      <div className="flex gap-6 text-sm tracking-widest uppercase">
        <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
        <Link href="/form" className="hover:text-yellow-500 transition-colors">Form</Link>
        <Link href="/payment" className="hover:text-yellow-500 transition-colors">Payment</Link>
      </div>
    </nav>
  );
}
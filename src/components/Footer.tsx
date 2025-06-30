import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a23] border-t border-[#FFD700]/20 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl text-[#FFD700] font-serif tracking-widest">☽</span>
              <span className="text-xl text-[#FFD700] font-bold font-serif tracking-wide">Celestial Calendar</span>
            </div>
            <p className="text-[#C0C0C0] mb-4 max-w-md">Your cosmic journey begins here.</p>
          </div>
          <div className="text-center">
            <p className="text-[#A0A0A0] text-sm">© 2024 Celestial Calendar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

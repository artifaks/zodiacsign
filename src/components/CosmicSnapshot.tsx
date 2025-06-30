"use client";

import React from "react";
import Link from 'next/link';

export default function CosmicSnapshot() {
  return (
    <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif text-[#FFD700] font-bold">🌌 Today's Cosmic Snapshot</h2>
        <Link 
          href="/horoscope" 
          className="text-sm text-[#FFD700] hover:text-white transition-colors font-medium"
        >
          🔮 Get Your Horoscope →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-[#C0C0C0]">🌙 Moon Phase</h3>
          <p className="text-[#FFD700]">Waxing Gibbous</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#C0C0C0]">☀️ Sun Sign</h3>
          <p className="text-[#FFD700]">Gemini</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#C0C0C0]">⚡ Energy Focus</h3>
          <p className="text-[#FFD700]">Expansion & Growth</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#C0C0C0]">🌠 Key Transits</h3>
          <p className="text-[#FFD700]">Venus trine Jupiter</p>
        </div>
      </div>
    </div>
  );
} 
"use client";

import React from "react";
import Link from 'next/link';

interface Props {
  sun: string;
  moon: string;
  reading: string;
}

const signIcons: Record<string, string> = {
  Aries: "\u2648", Taurus: "\u2649", Gemini: "\u264A", Cancer: "\u264B", Leo: "\u264C", Virgo: "\u264D", Libra: "\u264E", Scorpio: "\u264F", Sagittarius: "\u2650", Capricorn: "\u2651", Aquarius: "\u2652", Pisces: "\u2653"
};

export default function ChartResults({ sun, moon, reading }: Props) {
  return (
    <div className="w-full max-w-lg bg-[#232946]/90 border border-[#FFD700]/30 rounded-2xl shadow-xl flex flex-col items-center gap-6 p-8 mt-4 animate-fade-in">
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-6 text-3xl">
          <span title={`Sun in ${sun}`}>🌞 {signIcons[sun] || ""} {sun}</span>
          <span title={`Moon in ${moon}`}>🌙 {signIcons[moon] || ""} {moon}</span>
        </div>
      </div>
      <div className="text-[#FFD700] text-lg text-center font-serif whitespace-pre-line">{reading}</div>
      <div className="flex gap-4 mt-2">
        <button className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition">Copy</button>
        <button className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition">Share</button>
        <button className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition">Save</button>
      </div>
    </div>
  );
} 
"use client";

import React, { useState } from "react";
import Link from 'next/link';

interface Props {
  onSubmit: (formData: {
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  }) => void;
}

export default function BirthChartForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      birthDate: date,
      birthTime: time,
      birthPlace: location
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full max-w-md bg-[#232946]/80 p-6 rounded-2xl shadow-lg border border-[#FFD700]/20 mb-8">
      <input type="text" placeholder="Name (optional)" value={name} onChange={e => setName(e.target.value)} className="rounded-lg px-4 py-2 bg-[#0a0a23] text-[#C0C0C0] border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full" />
      <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="rounded-lg px-4 py-2 bg-[#0a0a23] text-[#C0C0C0] border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full" />
      <input type="time" required value={time} onChange={e => setTime(e.target.value)} className="rounded-lg px-4 py-2 bg-[#0a0a23] text-[#C0C0C0] border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full" />
      <input type="text" required placeholder="Place of Birth (e.g. New York, NY)" value={location} onChange={e => setLocation(e.target.value)} className="rounded-lg px-4 py-2 bg-[#0a0a23] text-[#C0C0C0] border border-[#FFD700]/20 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full" />
      <button type="submit" className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold text-lg shadow-lg hover:scale-105 transition-transform w-full">Reveal My Cosmic Blueprint</button>
    </form>
  );
} 
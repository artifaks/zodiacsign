"use client";

import React from "react";
import Link from 'next/link';
import { useState } from 'react';

export default function DailyRitual() {
  const [ritual, setRitual] = useState(
    'Light a white candle and write down your current intentions. Place a crystal beside it, and repeat your affirmation aloud under the moonlight.'
  );
  const [loading, setLoading] = useState(false);

  const fetchNewRitual = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sun: 'Gemini',
          moon: 'Cancer',
          context: 'daily ritual for waxing gibbous moon',
        }),
      });
      const data = await res.json();
      setRitual(data.message);
    } catch (error) {
      console.error('Error fetching ritual:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a23] rounded-xl p-6 text-white shadow-md mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">🌒 Daily Ritual Recommendation</h2>
        <button
          onClick={fetchNewRitual}
          disabled={loading}
          className="text-sm bg-yellow-400 px-3 py-1 rounded disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : '🔁 Refresh Ritual'}
        </button>
      </div>
      <p className="text-lg">{ritual}</p>
      <p className="text-sm mt-2 text-yellow-300">
        Perfect for today's Waxing Gibbous moon energy
      </p>
    </div>
  );
} 
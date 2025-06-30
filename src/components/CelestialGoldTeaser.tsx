"use client";

import React from "react";
import Link from 'next/link';

export default function CelestialGoldTeaser() {
  return (
    <div className="bg-gradient-to-br from-[#1b1b3a] to-[#0a0a23] rounded-xl p-6 text-white shadow-md mt-8">
      <h2 className="text-xl font-bold mb-2">✨ Want More Cosmic Power?</h2>
      <ul className="list-disc ml-5 mb-4 text-sm space-y-1">
        <li>Personalized forecast based on your birth chart</li>
        <li>Ritual guides for every moon phase</li>
        <li>Downloadable lunar calendar</li>
        <li>Advanced astrology insights</li>
      </ul>
      <a 
        href="/membership"
        className="bg-yellow-400 px-5 py-2 rounded font-semibold text-black hover:bg-yellow-300 transition-colors"
      >
        Upgrade to Celestial Gold
      </a>
      <p className="text-xs mt-1 text-gray-400">Only $4.99/month · Cancel anytime</p>
    </div>
  );
} 
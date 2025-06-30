"use client";

import React, { useState, useEffect } from "react";
import CosmicSnapshot from "./CosmicSnapshot";
import DailyRitual from "@/components/DailyRitual";
import JournalPrompt from "@/components/JournalPrompt";
import CelestialGoldTeaser from "@/components/CelestialGoldTeaser";
import AffiliateProducts from "@/components/AffiliateProducts";
import ShareButton from '@/components/ShareButton';
import Link from "next/link";

export default function HomeClient() {
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] overflow-hidden">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none animate-fade-in">
        <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.3 }}>
          <circle cx="10%" cy="20%" r="1.5" fill="#FFD700" />
          <circle cx="30%" cy="80%" r="1" fill="#C0C0C0" />
          <circle cx="70%" cy="40%" r="2" fill="#FFD700" />
          <circle cx="90%" cy="60%" r="1.2" fill="#C0C0C0" />
          <circle cx="50%" cy="10%" r="1.8" fill="#FFD700" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center gap-8 pt-24 pb-16">
        <div className="flex items-center gap-3 animate-fade-in">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="20" fill="#191970" stroke="#FFD700" strokeWidth="3" />
            <path d="M24 8a16 16 0 1 0 0 32 16 16 0 1 1 0-32z" fill="#C0C0C0" fillOpacity="0.3" />
            <circle cx="32" cy="16" r="3" fill="#FFD700" />
          </svg>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#FFD700] drop-shadow-lg tracking-wide animate-fade-in">The Celestial Calendar</h1>
        </div>
        <p className="text-lg sm:text-xl text-[#C0C0C0] text-center max-w-2xl animate-fade-in delay-100">Your mystical portal for daily horoscopes, lunar wisdom, and cosmic rituals.<br className='hidden sm:block'/>Awaken your magic every day.</p>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#FFD700] font-bold mb-6 drop-shadow-lg">
            🌟 Celestial Calendar
          </h1>
          <p className="text-xl md:text-2xl text-[#C0C0C0] max-w-3xl mx-auto mb-8">
            Discover your cosmic path through daily forecasts, lunar rituals, and personalized astrological insights.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/forecast" className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-8 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 transform hover:scale-105">
              🌟 Start Your Journey
            </Link>
            {siteUrl && (
              <ShareButton
                url={siteUrl}
                title="Celestial Calendar - Your Cosmic Journey Awaits"
                description="Discover daily forecasts, lunar rituals, and personalized astrological insights! 🌟"
                imageUrl="/images/crystals.svg"
              />
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 px-4 py-12 max-w-4xl mx-auto">
        <div className="flex flex-col gap-8">
          <CosmicSnapshot />
          <DailyRitual />
          <JournalPrompt />
          <CelestialGoldTeaser />
          <AffiliateProducts />
        </div>
      </main>

      {/* Soft Glow Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{boxShadow: '0 0 200px 60px #FFD70033, 0 0 400px 120px #C0C0C033'}} />
    </div>
  );
} 
"use client";

import React, { useState } from "react";
import CosmicSnapshot from "@/components/CosmicSnapshot";
import DailyRitual from "@/components/DailyRitual";
import ShareButton from '@/components/ShareButton';
import Link from 'next/link';

export default function ForecastPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<"email" | "sms" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type: 'email' }),
      });

      if (response.ok) {
        setSubscriptionType("email");
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSMSSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, type: 'sms' }),
      });

      if (response.ok) {
        setSubscriptionType("sms");
        setSubscribed(true);
        setPhone("");
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-6 drop-shadow-lg">
          Today&apos;s Celestial Forecast
        </h1>
        <p className="text-xl md:text-2xl text-[#C0C0C0] mb-8">
          Unlock the wisdom of the stars and align your day with cosmic energy.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cosmic Snapshot */}
        <CosmicSnapshot />

        {/* Daily Ritual */}
        <DailyRitual />

        {/* Cosmic Forecast */}
        <div className="bg-[#232946] rounded-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-serif text-[#FFD700] font-bold">
              🌟 Cosmic Forecast for {new Date().toLocaleDateString()}
            </h2>
            <ShareButton
              url={typeof window !== 'undefined' ? `${window.location.origin}/forecast` : '/forecast'}
              title="Daily Cosmic Forecast - Celestial Insights"
              description="Discover today&apos;s cosmic energies and planetary influences! 🌟"
              imageUrl="/images/crystals.svg"
            />
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-[#232946]/80 rounded-2xl shadow-xl p-8 border border-[#FFD700]/30">
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold text-center mb-6">
            🌟 Get Daily Forecasts Delivered
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Subscription */}
            <div className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20">
              <h3 className="text-lg font-bold text-[#FFD700] mb-4 flex items-center gap-2">
                📧 Email Forecasts
              </h3>
              <p className="text-[#C0C0C0] mb-4">
                Receive daily cosmic insights, moon phases, and personalized rituals in your inbox.
              </p>
              <form onSubmit={handleEmailSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-[#191970] text-[#C0C0C0] border border-[#FFD700]/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe to Email"}
                </button>
              </form>
            </div>

            {/* SMS Subscription */}
            <div className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20">
              <h3 className="text-lg font-bold text-[#FFD700] mb-4 flex items-center gap-2">
                📱 SMS Forecasts
              </h3>
              <p className="text-[#C0C0C0] mb-4">
                Get quick cosmic updates and moon phase alerts sent directly to your phone.
              </p>
              <form onSubmit={handleSMSSubscribe} className="space-y-3">
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 bg-[#191970] text-[#C0C0C0] border border-[#FFD700]/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow-md hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe to SMS"}
                </button>
              </form>
            </div>
          </div>

          {subscribed && (
            <div className="mt-6 text-center">
              <p className="text-green-400 text-lg font-medium">
                ✨ Successfully subscribed to {subscriptionType === "email" ? "email" : "SMS"} forecasts!
              </p>
              <p className="text-[#C0C0C0] text-sm mt-2">
                You&apos;ll receive your first forecast tomorrow morning.
              </p>
            </div>
          )}
        </div>

        {/* Explore Rituals Section */}
        <div className="bg-[#232946]/80 rounded-2xl shadow-xl p-8 border border-[#FFD700]/30">
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold text-center mb-6">
            🌙 Explore Rituals for Today
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20 text-center">
              <span className="text-4xl mb-4 block">🌅</span>
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">Morning Ritual</h3>
              <p className="text-[#C0C0C0] text-sm mb-4">
                Start your day aligned with the current moon phase energy
              </p>
              <Link href="/rituals/morning" className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition-colors">
                View Ritual
              </Link>
            </div>

            <div className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20 text-center">
              <span className="text-4xl mb-4 block">🌆</span>
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">Evening Ritual</h3>
              <p className="text-[#C0C0C0] text-sm mb-4">
                Wind down and reflect on your cosmic journey
              </p>
              <Link href="/rituals/evening" className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition-colors">
                View Ritual
              </Link>
            </div>

            <div className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20 text-center">
              <span className="text-4xl mb-4 block">🌕</span>
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">Moon Phase Ritual</h3>
              <p className="text-[#C0C0C0] text-sm mb-4">
                Special ceremony for today&apos;s moon phase
              </p>
              <Link href="/rituals/moon-phase" className="px-4 py-2 rounded-lg bg-[#FFD700]/20 text-[#FFD700] font-semibold hover:bg-[#FFD700]/40 transition-colors">
                View Ritual
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-[#232946]/80 rounded-2xl shadow-xl p-8 border border-[#FFD700]/30">
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold text-center mb-6">
            🔮 Enhance Your Cosmic Journey
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/birth-chart" className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20 hover:bg-[#0a0a23]/70 transition-colors">
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">🔮 Discover Your Birth Chart</h3>
              <p className="text-[#C0C0C0] text-sm">
                Get personalized insights based on your unique cosmic blueprint
              </p>
            </Link>

            <Link href="/membership" className="bg-[#0a0a23]/50 rounded-xl p-6 border border-[#FFD700]/20 hover:bg-[#0a0a23]/70 transition-colors">
              <h3 className="text-lg font-bold text-[#FFD700] mb-2">✨ Upgrade to Celestial Gold</h3>
              <p className="text-[#C0C0C0] text-sm">
                Access advanced forecasts, exclusive rituals, and personalized guidance
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import React from "react";

export default function ShopClient() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (productId: string, productName: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ebookId: productId, // Using the same field name for compatibility
          successUrl: productId === 'premium-celestial-planner' 
            ? `${window.location.origin}/celestial-planner/success`
            : `${window.location.origin}/ebook/success`,
          cancelUrl: `${window.location.origin}/shop`,
        }),
      });

      const data = await response.json();

      if (data.sessionId) {
        // Redirect to Stripe Checkout
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) {
          await stripe.redirectToCheckout({
            sessionId: data.sessionId,
          });
        }
      } else {
        console.error('Failed to create checkout session');
        alert('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Stripe dynamically
  const loadStripe = async (publishableKey: string) => {
    const { loadStripe } = await import('@stripe/stripe-js');
    return loadStripe(publishableKey);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">Your Lunar Toolkit</h1>
      <p className="text-lg md:text-xl text-[#C0C0C0] text-center max-w-2xl mb-8">Spiritual tools to support your moon-aligned journey</p>
      
      {/* Enhanced Celestial Planner - Free Feature */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-gradient-to-r from-[#1a1a2e]/95 to-[#232946]/95 border-2 border-[#FFD700]/30 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">✨</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">Enhanced Celestial Planner</h2>
            <p className="text-lg text-[#C0C0C0] mb-4">Complete lunar tracking system with real-time cosmic guidance</p>
            <div className="text-3xl font-bold text-green-400 mb-6">FREE</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <span className="text-3xl mb-2 block">📅</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Lunar Calendar</h3>
              <p className="text-[#C0C0C0] text-sm">Track all 2025-2026 celestial events with detailed descriptions</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">🌟</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Daily Forecast</h3>
              <p className="text-[#C0C0C0] text-sm">Real-time cosmic guidance based on current moon phase</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">🌙</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Manifestation Guide</h3>
              <p className="text-[#C0C0C0] text-sm">Phase-specific rituals and affirmations for your goals</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">💎</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Crystal Recommendations</h3>
              <p className="text-[#C0C0C0] text-sm">Personalized crystal suggestions for each moon phase</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              href="/enhanced-celestial-planner"
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Access Enhanced Planner
            </Link>
            <p className="text-[#C0C0C0] text-sm mt-3">No payment required • Instant access • High contrast mode available</p>
          </div>
        </div>
      </div>
      
      {/* Premium Celestial Planner - Featured Product */}
      <div className="w-full max-w-6xl mb-12">
        <div className="bg-gradient-to-r from-[#232946]/95 to-[#1a1a2e]/95 border-2 border-[#FFD700]/40 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">🌟</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">Premium Celestial Planner 2025-2026</h2>
            <p className="text-lg text-[#C0C0C0] mb-4">Complete lunar ritual system with birth chart insights and cosmic guidance</p>
            <div className="text-3xl font-bold text-[#FFD700] mb-6">$4.99</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <span className="text-3xl mb-2 block">🌙</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Complete Moon Rituals</h3>
              <p className="text-[#C0C0C0] text-sm">Step-by-step ritual guides for all 8 lunar phases with affirmations</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">🔮</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Birth Chart Calculator</h3>
              <p className="text-[#C0C0C0] text-sm">Discover your Sun & Moon signs with personalized interpretations</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">💎</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Crystal Guide</h3>
              <p className="text-[#C0C0C0] text-sm">Zodiac-specific crystal recommendations and healing practices</p>
            </div>
            <div className="text-center">
              <span className="text-3xl mb-2 block">✨</span>
              <h3 className="text-[#FFD700] font-semibold mb-2">Daily Cosmic Guidance</h3>
              <p className="text-[#C0C0C0] text-sm">Daily horoscopes and ritual recommendations based on cosmic energy</p>
            </div>
          </div>
          
          <div className="bg-[#1a1a2e]/50 rounded-2xl p-6 mb-6">
            <h3 className="text-[#FFD700] font-bold text-lg mb-4">What's Included:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[#FFD700] font-semibold mb-2">🌟 Core Features</h4>
                <ul className="text-[#C0C0C0] space-y-1 text-sm">
                  <li className="flex items-center gap-2">✓ Complete Moon Phase Ritual System</li>
                  <li className="flex items-center gap-2">✓ Birth Chart Calculator & Analysis</li>
                  <li className="flex items-center gap-2">✓ Daily Horoscope Generator</li>
                  <li className="flex items-center gap-2">✓ Crystal Healing Guide</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#FFD700] font-semibold mb-2">🌙 Ritual & Practice Tools</h4>
                <ul className="text-[#C0C0C0] space-y-1 text-sm">
                  <li className="flex items-center gap-2">✓ 8 Lunar Phase Rituals</li>
                  <li className="flex items-center gap-2">✓ Personalized Affirmations</li>
                  <li className="flex items-center gap-2">✓ Step-by-step Instructions</li>
                  <li className="flex items-center gap-2">✓ Cosmic Energy Guidance</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#FFD700]/20">
              <h4 className="text-[#FFD700] font-semibold mb-2">📱 Digital Tools</h4>
              <ul className="text-[#C0C0C0] space-y-1 text-sm">
                <li className="flex items-center gap-2">✓ Printable Ritual Templates</li>
                <li className="flex items-center gap-2">✓ Cosmic AI Assistant (Luna)</li>
                <li className="flex items-center gap-2">✓ Daily Ritual Recommendations</li>
                <li className="flex items-center gap-2">✓ Share & Save Features</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => handlePurchase('premium-celestial-planner', 'Premium Celestial Planner')}
              disabled={isLoading}
              className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#191970] font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Get Premium Access'}
            </button>
            <p className="text-[#C0C0C0] text-sm mt-3">Secure payment • Instant digital download • Lifetime access • Ready to use today</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Product 1: Celestial Planner */}
        <div className="bg-[#232946]/90 border border-[#FFD700]/20 rounded-2xl shadow-lg flex flex-col items-center p-6 gap-4">
          <span className="text-4xl">📓</span>
          <h3 className="text-lg font-bold text-[#FFD700] text-center">2025 Celestial Planner</h3>
          <p className="text-[#C0C0C0] text-center text-base">Plan your year with the stars</p>
          <div className="text-[#FFD700] font-bold text-lg">$9.99</div>
          <a href="#" className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow hover:scale-105 transition-transform">Buy Now</a>
        </div>
        {/* Product 2: Manifestation Guide */}
        <div className="bg-[#232946]/90 border border-[#FFD700]/20 rounded-2xl shadow-lg flex flex-col items-center p-6 gap-4">
          <span className="text-4xl">🔥</span>
          <h3 className="text-lg font-bold text-[#FFD700] text-center">New Moon Manifestation Guide</h3>
          <p className="text-[#C0C0C0] text-center text-base">Printable ritual + journal prompts</p>
          <div className="text-[#FFD700] font-bold text-lg">$4.99</div>
          <a href="#" className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow hover:scale-105 transition-transform">Buy Now</a>
        </div>
        {/* Product 3: Astrology Crystal Guide */}
        <div className="bg-[#232946]/90 border border-[#FFD700]/20 rounded-2xl shadow-lg flex flex-col items-center p-6 gap-4">
          <span className="text-4xl">💎</span>
          <h3 className="text-lg font-bold text-[#FFD700] text-center">Astrology Crystal Guide (PDF)</h3>
          <p className="text-[#C0C0C0] text-center text-base">Best crystals by zodiac sign</p>
          <div className="text-[#FFD700] font-bold text-lg">$3.99</div>
          <a href="#" className="mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow hover:scale-105 transition-transform">Buy Now</a>
        </div>
      </div>
    </div>
  );
} 
"use client";

import { useState } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

export default function MembershipClient() {
  const premiumFeatures = [
    {
      title: "🔮 Personalized Birth Chart Forecasts",
      description: "Get daily insights tailored to your unique cosmic blueprint",
      status: "Coming Soon",
      icon: "⭐"
    },
    {
      title: "🌙 Moon Phase Ritual Guides",
      description: "Detailed ceremonies for every lunar phase",
      status: "Coming Soon", 
      icon: "⭐"
    },
    {
      title: "📅 Downloadable Lunar Calendar",
      description: "Beautiful PDF calendars with moon phases and astrology",
      status: "Coming Soon",
      icon: "⭐"
    },
    {
      title: "🎯 Advanced Astrology Insights",
      description: "Professional-level planetary transits and aspects",
      status: "Coming Soon",
      icon: "⭐"
    },
    {
      title: "📱 Priority Support",
      description: "Direct access to our cosmic guidance team",
      status: "Available Now",
      icon: "✅"
    },
    {
      title: "🎨 Exclusive Content",
      description: "Members-only articles, meditations, and resources",
      status: "Available Now",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-[#FFD700] font-bold mb-6 drop-shadow-lg">
          ✨ Celestial Gold Membership
        </h1>
        <p className="text-xl md:text-2xl text-[#C0C0C0] max-w-4xl mx-auto mb-8">
          Unlock exclusive cosmic insights, personalized rituals, and premium astrological content
        </p>
        <div className="flex justify-center">
          <ShareButton
            url={typeof window !== 'undefined' ? `${window.location.origin}/membership` : '/membership'}
            title="Celestial Gold Membership - Premium Cosmic Insights"
            description="Join the exclusive Celestial Gold membership for premium astrological content and personalized cosmic guidance! ✨"
            imageUrl="/images/crystals.svg"
          />
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-[#232946]/80 rounded-2xl shadow-xl p-8 border border-[#FFD700]/30">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔮</div>
            <h2 className="text-3xl font-bold text-[#FFD700] mb-2">Only $4.99/month</h2>
            <p className="text-[#C0C0C0]">Cancel anytime • 7-day free trial</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#FFD700] mb-4">What's Included:</h3>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-lg">{feature.icon}</span>
                    <div>
                      <div className="font-semibold text-white">{feature.title}</div>
                      <div className="text-sm text-[#C0C0C0]">{feature.description}</div>
                      <div className="text-xs text-yellow-400 mt-1">{feature.status}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0a0a23]/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#FFD700] mb-4">Ready to Upgrade?</h3>
              <p className="text-[#C0C0C0] mb-6">
                Join thousands of spiritual seekers who have transformed their lives with cosmic guidance.
              </p>
              
              <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform mb-4">
                Start 7-Day Free Trial
              </button>
              
              <p className="text-xs text-[#C0C0C0] text-center">
                Secure payment via Stripe • No commitment required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Details */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif text-[#FFD700] font-bold text-center mb-8">
          🌟 Premium Features in Development
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#232946]/80 rounded-xl p-6 border border-[#FFD700]/20">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">🔮 Personalized Forecasts</h3>
            <p className="text-[#C0C0C0] text-sm mb-4">
              Our AI will analyze your birth chart to provide daily insights that are uniquely tailored to your cosmic signature.
            </p>
            <div className="text-xs text-yellow-400">Expected: Q1 2024</div>
          </div>

          <div className="bg-[#232946]/80 rounded-xl p-6 border border-[#FFD700]/20">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">🌙 Moon Phase Rituals</h3>
            <p className="text-[#C0C0C0] text-sm mb-4">
              Step-by-step ritual guides for each moon phase, including new moon intentions and full moon releases.
            </p>
            <div className="text-xs text-yellow-400">Expected: Q1 2024</div>
          </div>

          <div className="bg-[#232946]/80 rounded-xl p-6 border border-[#FFD700]/20">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">📅 Lunar Calendar</h3>
            <p className="text-[#C0C0C0] text-sm mb-4">
              Beautiful downloadable calendars with moon phases, astrological events, and ritual timing.
            </p>
            <div className="text-xs text-yellow-400">Expected: Q2 2024</div>
          </div>

          <div className="bg-[#232946]/80 rounded-xl p-6 border border-[#FFD700]/20">
            <h3 className="text-lg font-bold text-[#FFD700] mb-3">🎯 Advanced Insights</h3>
            <p className="text-[#C0C0C0] text-sm mb-4">
              Professional-level astrology including planetary transits, aspects, and house interpretations.
            </p>
            <div className="text-xs text-yellow-400">Expected: Q2 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
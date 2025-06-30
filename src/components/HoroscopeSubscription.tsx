"use client";

import { useState } from 'react';
import Link from 'next/link';

const zodiacSigns = [
  { sign: "Aries", emoji: "♈", name: "Aries", dates: "Mar 21 - Apr 19" },
  { sign: "Taurus", emoji: "♉", name: "Taurus", dates: "Apr 20 - May 20" },
  { sign: "Gemini", emoji: "♊", name: "Gemini", dates: "May 21 - Jun 20" },
  { sign: "Cancer", emoji: "♋", name: "Cancer", dates: "Jun 21 - Jul 22" },
  { sign: "Leo", emoji: "♌", name: "Leo", dates: "Jul 23 - Aug 22" },
  { sign: "Virgo", emoji: "♍", name: "Virgo", dates: "Aug 23 - Sep 22" },
  { sign: "Libra", emoji: "♎", name: "Libra", dates: "Sep 23 - Oct 22" },
  { sign: "Scorpio", emoji: "♏", name: "Scorpio", dates: "Oct 23 - Nov 21" },
  { sign: "Sagittarius", emoji: "♐", name: "Sagittarius", dates: "Nov 22 - Dec 21" },
  { sign: "Capricorn", emoji: "♑", name: "Capricorn", dates: "Dec 22 - Jan 19" },
  { sign: "Aquarius", emoji: "♒", name: "Aquarius", dates: "Jan 20 - Feb 18" },
  { sign: "Pisces", emoji: "♓", name: "Pisces", dates: "Feb 19 - Mar 20" }
];

export default function HoroscopeSubscription() {
  const [email, setEmail] = useState('');
  const [selectedSign, setSelectedSign] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showSignSelector, setShowSignSelector] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !selectedSign) {
      setMessage({ type: 'error', text: 'Please enter your email and select your zodiac sign.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          zodiacSign: selectedSign
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setEmail('');
        setSelectedSign('');
        setShowSignSelector(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">📧</div>
        <h3 className="text-2xl font-serif text-[#FFD700] font-bold mb-2">
          Get Daily Horoscopes in Your Inbox
        </h3>
        <p className="text-[#C0C0C0]">
          Wake up to your personalized cosmic forecast every morning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-[#FFD700] font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 bg-[#0a0a23] border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#808080] focus:border-[#FFD700] focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-[#FFD700] font-semibold mb-2">
            Your Zodiac Sign
          </label>
          {!showSignSelector ? (
            <button
              type="button"
              onClick={() => setShowSignSelector(true)}
              className="w-full px-4 py-3 bg-[#0a0a23] border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] hover:border-[#FFD700] transition-colors text-left"
            >
              {selectedSign ? zodiacSigns.find(z => z.sign === selectedSign)?.name : 'Select your zodiac sign'}
            </button>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
              {zodiacSigns.map((zodiac) => (
                <button
                  key={zodiac.sign}
                  type="button"
                  onClick={() => {
                    setSelectedSign(zodiac.sign);
                    setShowSignSelector(false);
                  }}
                  className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                    selectedSign === zodiac.sign
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-[#FFD700]/30 bg-[#0a0a23] hover:border-[#FFD700]/60'
                  }`}
                >
                  <div className="text-2xl mb-1">{zodiac.emoji}</div>
                  <div className="text-sm font-semibold text-[#FFD700]">{zodiac.name}</div>
                  <div className="text-xs text-[#C0C0C0]">{zodiac.dates}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-900/20 border border-green-500/30 text-green-300' 
              : 'bg-red-900/20 border border-red-500/30 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email || !selectedSign}
          className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
              Subscribing...
            </div>
          ) : (
            'Subscribe to Daily Horoscopes'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#C0C0C0]">
          ✨ Free daily horoscopes delivered to your inbox
        </p>
        <p className="text-xs text-[#808080] mt-2">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
} 
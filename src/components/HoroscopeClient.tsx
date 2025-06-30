"use client";

import { useState } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import HoroscopeSubscription from '@/components/HoroscopeSubscription';

const zodiacSigns = [
  { sign: "aries", emoji: "♈", name: "Aries", dates: "Mar 21 - Apr 19" },
  { sign: "taurus", emoji: "♉", name: "Taurus", dates: "Apr 20 - May 20" },
  { sign: "gemini", emoji: "♊", name: "Gemini", dates: "May 21 - Jun 20" },
  { sign: "cancer", emoji: "♋", name: "Cancer", dates: "Jun 21 - Jul 22" },
  { sign: "leo", emoji: "♌", name: "Leo", dates: "Jul 23 - Aug 22" },
  { sign: "virgo", emoji: "♍", name: "Virgo", dates: "Aug 23 - Sep 22" },
  { sign: "libra", emoji: "♎", name: "Libra", dates: "Sep 23 - Oct 22" },
  { sign: "scorpio", emoji: "♏", name: "Scorpio", dates: "Oct 23 - Nov 21" },
  { sign: "sagittarius", emoji: "♐", name: "Sagittarius", dates: "Nov 22 - Dec 21" },
  { sign: "capricorn", emoji: "♑", name: "Capricorn", dates: "Dec 22 - Jan 19" },
  { sign: "aquarius", emoji: "♒", name: "Aquarius", dates: "Jan 20 - Feb 18" },
  { sign: "pisces", emoji: "♓", name: "Pisces", dates: "Feb 19 - Mar 20" }
];

export default function HoroscopeClient() {
  const [selectedSign, setSelectedSign] = useState("");
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  const fetchHoroscope = async (sign: string) => {
    setLoading(true);
    setError(null);
    setSelectedSign(sign);
    setHoroscope(null);
    try {
      const res = await fetch(`/api/generate-daily-horoscope?sign=${encodeURIComponent(sign.charAt(0).toUpperCase() + sign.slice(1))}`);
      if (!res.ok) throw new Error('Failed to fetch horoscope');
      const data = await res.json();
      setHoroscope(data.horoscope);
    } catch (err) {
      setError('Could not fetch your daily horoscope. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
            🔮 Daily Horoscope
          </h1>
          <p className="text-lg text-[#C0C0C0] mb-2">
            Discover what the stars have in store for you today
          </p>
          <p className="text-sm text-[#FFD700] font-semibold">
            {currentDate}
          </p>
        </div>

        {!selectedSign ? (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {zodiacSigns.map((zodiac) => (
                <button
                  key={zodiac.sign}
                  onClick={() => fetchHoroscope(zodiac.sign)}
                  className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {zodiac.emoji}
                  </div>
                  <h3 className="text-lg font-serif text-[#FFD700] font-bold mb-1">
                    {zodiac.name}
                  </h3>
                  <p className="text-xs text-[#C0C0C0]">
                    {zodiac.dates}
                  </p>
                </button>
              ))}
            </div>
            {/* Email Subscription Section */}
            <HoroscopeSubscription />
          </div>
        ) : (
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔮</div>
                <p className="text-lg text-[#C0C0C0]">Consulting the stars...</p>
                <div className="mt-4 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-400 py-8">
                <p>{error}</p>
                <button
                  onClick={() => {
                    setSelectedSign("");
                    setHoroscope(null);
                    setError(null);
                  }}
                  className="mt-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
                >
                  Try Another Sign
                </button>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20 text-center">
                  <div className="text-6xl mb-4">
                    {zodiacSigns.find(z => z.sign === selectedSign)?.emoji}
                  </div>
                  <h2 className="text-3xl font-serif text-[#FFD700] font-bold mb-2">
                    {zodiacSigns.find(z => z.sign === selectedSign)?.name}
                  </h2>
                  <p className="text-[#C0C0C0]">
                    Your cosmic forecast for {currentDate}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20 text-lg text-[#FFD700] font-serif whitespace-pre-line text-center">
                  {horoscope}
                </div>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setSelectedSign("");
                      setHoroscope(null);
                      setError(null);
                    }}
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 mr-4"
                  >
                    Choose Another Sign
                  </button>
                  <ShareButton
                    url={`${window.location.origin}/horoscope?sign=${selectedSign}`}
                    title={`${zodiacSigns.find(z => z.sign === selectedSign)?.name} Horoscope - ${currentDate}`}
                    description={horoscope ? horoscope.slice(0, 120) + '...' : 'Discover your daily cosmic forecast!'}
                    imageUrl="/images/crystals.svg"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
"use client";

import { useState, useEffect } from 'react';
import BirthChartForm from '@/components/BirthChartForm';
import ChartResults from '@/components/ChartResults';
import ShareButton from '@/components/ShareButton';

export default function BirthChartClient() {
  const [sun, setSun] = useState('');
  const [moon, setMoon] = useState('');
  const [reading, setReading] = useState('');
  const [loading, setLoading] = useState(false);
  const [siteUrl, setSiteUrl] = useState('');

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  const handleFormSubmit = async (formData: {
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  }) => {
    setLoading(true);

    try {
      // For now, we'll use placeholder data since the API routes were removed
      // In a real implementation, you would integrate with an astrology API
      const mockSunSign = getMockSunSign(formData.birthDate);
      const mockMoonSign = getMockMoonSign(formData.birthDate);
      
      setSun(mockSunSign);
      setMoon(mockMoonSign);

      // Generate a mock reading
      const mockReading = generateMockReading(mockSunSign, mockMoonSign);
      setReading(mockReading);
    } catch (error) {
      console.error('Error:', error);
      // Set fallback data
      setSun('Aries');
      setMoon('Cancer');
      setReading('Your cosmic journey reveals a dynamic blend of fire and water energies. As an Aries with a Cancer moon, you embody both the warrior spirit and emotional depth. Your path is one of courageous vulnerability and passionate nurturing.');
    } finally {
      setLoading(false);
    }
  };

  // Mock functions for demonstration
  const getMockSunSign = (birthDate: string): string => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  const getMockMoonSign = (birthDate: string): string => {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const date = new Date(birthDate);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return signs[dayOfYear % 12];
  };

  const generateMockReading = (sunSign: string, moonSign: string): string => {
    const readings = {
      'Aries': {
        'Cancer': 'Your fiery Aries sun meets the nurturing Cancer moon, creating a unique blend of courage and compassion. You lead with your heart and protect those you love fiercely.',
        'Leo': 'Double fire energy! Your Aries sun and Leo moon create an unstoppable force of passion and creativity. You were born to shine and inspire others.',
        'default': 'Your Aries sun brings bold leadership and pioneering spirit. You approach life with enthusiasm and courage.'
      },
      'Taurus': {
        'Virgo': 'Earth meets earth in perfect harmony. Your Taurus sun and Virgo moon create a grounded, practical approach to life with an eye for beauty and detail.',
        'default': 'Your Taurus sun brings stability, determination, and a deep appreciation for life\'s pleasures.'
      },
      'default': `Your ${sunSign} sun and ${moonSign} moon create a fascinating cosmic combination. The ${sunSign} energy brings your core identity, while your ${moonSign} moon shapes your emotional landscape. Together, they guide your unique path through this lifetime.`
    };

    const sunReadings = readings[sunSign as keyof typeof readings] || readings.default;
    if (typeof sunReadings === 'object') {
      return sunReadings[moonSign as keyof typeof sunReadings] || sunReadings.default;
    }
    return sunReadings;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">🔮 Discover Your Cosmic Blueprint</h1>
      <p className="text-lg md:text-xl text-[#C0C0C0] text-center max-w-2xl mb-8">Reveal your Sun & Moon signs and receive a mystical interpretation.</p>
      <BirthChartForm onSubmit={handleFormSubmit} />
      <div className="mt-10">
        {loading && <p className="text-center text-lg text-[#C0C0C0]">Calculating your cosmic insights...</p>}
        {sun && moon && reading && (
          <div className="relative">
            <ChartResults sun={sun} moon={moon} reading={reading} />
            <div className="mt-6 text-center">
              {siteUrl && (
                <ShareButton
                  url={`${siteUrl}/birth-chart`}
                  title={`My Cosmic Blueprint: ${sun} Sun, ${moon} Moon`}
                  description={`Discover your unique cosmic blueprint with Sun and Moon sign insights! 🌟`}
                  imageUrl="/images/crystals.svg"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
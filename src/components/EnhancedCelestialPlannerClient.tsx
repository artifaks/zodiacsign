"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

// Enhanced lunar phase calculation
function getLunarPhase(date: Date = new Date()) {
  const knownNewMoon = new Date(2000, 0, 6);
  const lunarMonth = 29.53058867;
  
  const daysSinceKnown = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phase = (daysSinceKnown % lunarMonth) / lunarMonth;
  
  if (phase < 0.0625) return "new";
  if (phase < 0.1875) return "waxing-crescent";
  if (phase < 0.3125) return "first-quarter";
  if (phase < 0.4375) return "waxing-gibbous";
  if (phase < 0.5625) return "full";
  if (phase < 0.6875) return "waning-gibbous";
  if (phase < 0.8125) return "last-quarter";
  if (phase < 0.9375) return "waning-crescent";
  return "new";
}

// Enhanced celestial events data
const celestialEvents2025 = [
  {
    date: "2025-01-14",
    title: "New Moon in Capricorn",
    description: "Perfect time for setting career and financial goals",
    type: "new-moon",
    time: "10:26 AM EST"
  },
  {
    date: "2025-01-28",
    title: "Full Moon in Leo",
    description: "Celebrate achievements and express creativity",
    type: "full-moon",
    time: "12:19 PM EST"
  },
  {
    date: "2025-02-12",
    title: "New Moon in Aquarius",
    description: "Innovation and humanitarian goals take center stage",
    type: "new-moon",
    time: "8:53 PM EST"
  },
  {
    date: "2025-02-27",
    title: "Full Moon in Virgo",
    description: "Focus on health, organization, and service to others",
    type: "full-moon",
    time: "8:45 AM EST"
  },
  {
    date: "2025-03-14",
    title: "New Moon in Pisces",
    description: "Spiritual growth and intuitive development",
    type: "new-moon",
    time: "6:21 AM EDT"
  },
  {
    date: "2025-03-29",
    title: "Full Moon in Libra",
    description: "Balance relationships and seek harmony",
    type: "full-moon",
    time: "2:57 AM EDT"
  },
  {
    date: "2025-04-12",
    title: "New Moon in Aries",
    description: "New beginnings and personal initiative",
    type: "new-moon",
    time: "3:22 PM EDT"
  },
  {
    date: "2025-04-27",
    title: "Full Moon in Scorpio",
    description: "Deep transformation and emotional release",
    type: "full-moon",
    time: "11:31 PM EDT"
  },
  {
    date: "2025-05-12",
    title: "New Moon in Taurus",
    description: "Grounding and material abundance",
    type: "new-moon",
    time: "12:56 AM EDT"
  },
  {
    date: "2025-05-27",
    title: "Full Moon in Sagittarius",
    description: "Expansion and philosophical growth",
    type: "full-moon",
    time: "7:02 AM EDT"
  }
];

const celestialEvents2026 = [
  {
    date: "2026-01-03",
    title: "New Moon in Capricorn",
    description: "Start the year with ambitious goal-setting",
    type: "new-moon",
    time: "10:33 AM EST"
  },
  {
    date: "2026-01-17",
    title: "Full Moon in Cancer",
    description: "Emotional fulfillment and family connections",
    type: "full-moon",
    time: "6:26 PM EST"
  },
  {
    date: "2026-02-02",
    title: "New Moon in Aquarius",
    description: "Revolutionary ideas and social change",
    type: "new-moon",
    time: "6:09 AM EST"
  },
  {
    date: "2026-02-16",
    title: "Full Moon in Leo",
    description: "Creative expression and personal power",
    type: "full-moon",
    time: "11:01 AM EST"
  },
  {
    date: "2026-03-03",
    title: "New Moon in Pisces",
    description: "Spiritual awakening and dream manifestation",
    type: "new-moon",
    time: "1:38 PM EST"
  },
  {
    date: "2026-03-18",
    title: "Full Moon in Virgo",
    description: "Practical magic and service to others",
    type: "full-moon",
    time: "3:23 AM EDT"
  },
  {
    date: "2026-04-02",
    title: "New Moon in Aries",
    description: "Dynamic new beginnings and leadership",
    type: "new-moon",
    time: "6:11 AM EDT"
  },
  {
    date: "2026-04-16",
    title: "Full Moon in Libra",
    description: "Relationship harmony and artistic expression",
    type: "full-moon",
    time: "2:55 PM EDT"
  },
  {
    date: "2026-05-01",
    title: "New Moon in Taurus",
    description: "Material abundance and sensual pleasures",
    type: "new-moon",
    time: "11:23 PM EDT"
  },
  {
    date: "2026-05-16",
    title: "Full Moon in Scorpio",
    description: "Intense transformation and psychic insights",
    type: "full-moon",
    time: "1:14 AM EDT"
  }
];

export default function EnhancedCelestialPlannerClient() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');

  const currentEvents = currentYear === 2025 ? celestialEvents2025 : celestialEvents2026;
  const currentPhase = getLunarPhase();

  const getEventIcon = (type: string) => {
    switch (type) {
      case "new-moon": return "🌑";
      case "full-moon": return "🌕";
      case "solar-eclipse": return "☀️";
      case "lunar-eclipse": return "🌙";
      default: return "⭐";
    }
  };

  const getEventColor = (type: string) => {
    if (isHighContrast) {
      switch (type) {
        case "new-moon": return "bg-white text-black border-2 border-white font-bold";
        case "full-moon": return "bg-yellow-400 text-black border-2 border-yellow-400 font-bold";
        default: return "bg-white text-black border-2 border-white font-bold";
      }
    }
    switch (type) {
      case "new-moon": return "bg-[#232946] text-[#FFD700] border border-[#FFD700]/30";
      case "full-moon": return "bg-[#FFD700] text-[#191970] border border-[#FFD700]";
      default: return "bg-[#232946] text-[#C0C0C0] border border-[#FFD700]/20";
    }
  };

  const renderCalendar = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        📅 {currentYear} Celestial Calendar
      </h2>
      <div className="grid gap-4">
        {currentEvents.map((event, index) => (
          <div
            key={index}
            onClick={() => setSelectedEvent(event)}
            className={`p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
              getEventColor(event.type)
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getEventIcon(event.type)}</span>
              <div className="flex-1">
                <h3 className="font-bold">{event.title}</h3>
                <p className={`text-sm ${isHighContrast ? "text-black" : "text-[#C0C0C0]"}`}>
                  {event.description}
                </p>
                <p className={`text-xs ${isHighContrast ? "text-black" : "text-[#C0C0C0]"}`}>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderForecast = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        🌟 Cosmic Forecast
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Current Lunar Phase</h3>
          <div className="text-4xl mb-2">
            {currentPhase === 'new' && "🌑"}
            {currentPhase === 'waxing-crescent' && "🌒"}
            {currentPhase === 'first-quarter' && "🌓"}
            {currentPhase === 'waxing-gibbous' && "🌔"}
            {currentPhase === 'full' && "🌕"}
            {currentPhase === 'waning-gibbous' && "🌖"}
            {currentPhase === 'last-quarter' && "🌗"}
            {currentPhase === 'waning-crescent' && "🌘"}
          </div>
          <p className={`${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            {currentPhase === 'new' && "New Moon - Time for new beginnings"}
            {currentPhase === 'waxing-crescent' && "Waxing Crescent - Building momentum"}
            {currentPhase === 'first-quarter' && "First Quarter - Taking action"}
            {currentPhase === 'waxing-gibbous' && "Waxing Gibbous - Refining plans"}
            {currentPhase === 'full' && "Full Moon - Celebration and release"}
            {currentPhase === 'waning-gibbous' && "Waning Gibbous - Gratitude and sharing"}
            {currentPhase === 'last-quarter' && "Last Quarter - Forgiveness and completion"}
            {currentPhase === 'waning-crescent' && "Waning Crescent - Rest and reflection"}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Today's Energy</h3>
          <p className={`${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            {currentPhase === 'new' && "Perfect time for setting new intentions and starting fresh projects"}
            {currentPhase === 'full' && "Ideal for releasing what no longer serves and celebrating achievements"}
            {currentPhase === 'waxing-crescent' && "Great for gathering resources and building momentum"}
            {currentPhase === 'first-quarter' && "Excellent for taking action and making important decisions"}
            {currentPhase === 'waxing-gibbous' && "Perfect for refining plans and preparing for success"}
            {currentPhase === 'waning-gibbous' && "Ideal for expressing gratitude and sharing knowledge"}
            {currentPhase === 'last-quarter' && "Great for forgiveness and completing cycles"}
            {currentPhase === 'waning-crescent' && "Perfect for rest, reflection, and preparation"}
          </p>
        </div>
      </div>
    </div>
  );

  const renderManifestation = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        🌙 Manifestation Guide
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">New Moon Rituals</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Write intentions on paper</li>
            <li>• Plant seeds (real or symbolic)</li>
            <li>• Light a white candle</li>
            <li>• Create a vision board</li>
            <li>• Meditate on your goals</li>
          </ul>
        </div>
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Full Moon Rituals</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Release what no longer serves</li>
            <li>• Take a moonlight bath</li>
            <li>• Practice gratitude</li>
            <li>• Charge crystals in moonlight</li>
            <li>• Celebrate achievements</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderRituals = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        🕯️ Sacred Rituals
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Daily Practices</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Morning meditation</li>
            <li>• Journal your dreams</li>
            <li>• Connect with nature</li>
            <li>• Practice gratitude</li>
            <li>• Set daily intentions</li>
          </ul>
        </div>
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Weekly Practices</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Crystal cleansing</li>
            <li>• Tarot reading</li>
            <li>• Energy clearing</li>
            <li>• Creative expression</li>
            <li>• Community connection</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCrystals = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        💎 Crystal Guide
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">New Moon Crystals</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Clear Quartz - Amplification</li>
            <li>• Moonstone - New beginnings</li>
            <li>• Selenite - Clarity</li>
            <li>• Amethyst - Spiritual growth</li>
            <li>• Rose Quartz - Self-love</li>
          </ul>
        </div>
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Full Moon Crystals</h3>
          <ul className={`space-y-2 ${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            <li>• Labradorite - Protection</li>
            <li>• Black Obsidian - Release</li>
            <li>• Citrine - Abundance</li>
            <li>• Tiger's Eye - Courage</li>
            <li>• Lapis Lazuli - Wisdom</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderBirthChart = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        🔮 Birth Chart Insights
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Sun Signs</h3>
          <p className={`${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            Your sun sign represents your core identity and life purpose. It's the essence of who you are and what drives you forward in life.
          </p>
        </div>
        <div className={`p-4 rounded-lg ${
          isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
        }`}>
          <h3 className="text-lg font-bold mb-2">Moon Signs</h3>
          <p className={`${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
            Your moon sign reveals your emotional nature and inner world. It shows how you process feelings and what brings you emotional security.
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/birth-chart"
          className={`inline-block px-6 py-3 rounded-lg font-bold transition-all ${
            isHighContrast
              ? "bg-black text-white border-2 border-white hover:bg-white hover:text-black"
              : "bg-[#FFD700] text-[#191970] hover:scale-105"
          }`}
        >
          Calculate Your Birth Chart
        </Link>
      </div>
    </div>
  );

  const renderLunarCalendar = () => (
    <div className={`rounded-2xl p-6 ${
      isHighContrast ? "bg-white text-black" : "bg-[#232946]/80 border border-[#FFD700]/20"
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isHighContrast ? "text-black" : "text-[#FFD700]"
      }`}>
        📅 Lunar Calendar
      </h2>
      <div className={`p-4 rounded-lg ${
        isHighContrast ? "bg-black text-white" : "bg-[#0a0a23]/50"
      }`}>
        <h3 className="text-lg font-bold mb-2">Current Phase Guidance</h3>
        <p className={`${isHighContrast ? "text-white" : "text-[#C0C0C0]"}`}>
          {currentPhase === 'new' && "Perfect time for setting new intentions and starting fresh projects"}
          {currentPhase === 'full' && "Ideal for releasing what no longer serves and celebrating achievements"}
          {currentPhase === 'waxing-crescent' && "Great for gathering resources and building momentum"}
          {currentPhase === 'first-quarter' && "Excellent for taking action and making important decisions"}
          {currentPhase === 'waxing-gibbous' && "Perfect for refining plans and preparing for success"}
          {currentPhase === 'waning-gibbous' && "Ideal for expressing gratitude and sharing knowledge"}
          {currentPhase === 'last-quarter' && "Great for forgiveness and completing cycles"}
          {currentPhase === 'waning-crescent' && "Perfect for rest, reflection, and preparation"}
        </p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isHighContrast
        ? "bg-black text-white"
        : "bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] text-white"
    } pt-32 pb-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-4xl">✨</div>
            <h1 className={`text-4xl md:text-5xl font-bold ${
              isHighContrast
                ? "text-white"
                : "bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
            }`}>
              Enhanced Celestial Planner
            </h1>
            <div className="text-4xl">🌙</div>
          </div>
          <p className={`text-lg md:text-xl mb-6 ${isHighContrast ? "text-white font-semibold" : "text-[#C0C0C0]"}`}>
            Complete lunar tracking, rituals, and cosmic guidance system
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentYear(2025)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentYear === 2025
                    ? "bg-[#FFD700] text-[#191970] font-bold"
                    : isHighContrast
                      ? "bg-black text-white border-2 border-white hover:bg-white hover:text-black"
                      : "bg-[#232946]/50 text-[#C0C0C0] hover:bg-[#232946]"
                }`}
              >
                2025
              </button>
              <button
                onClick={() => setCurrentYear(2026)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentYear === 2026
                    ? "bg-[#FFD700] text-[#191970] font-bold"
                    : isHighContrast
                      ? "bg-black text-white border-2 border-white hover:bg-white hover:text-black"
                      : "bg-[#232946]/50 text-[#C0C0C0] hover:bg-[#232946]"
                }`}
              >
                2026
              </button>
            </div>

            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isHighContrast
                  ? "bg-white text-black border-2 border-white hover:bg-black hover:text-white"
                  : "bg-[#232946]/50 text-[#C0C0C0] hover:bg-[#232946]"
              }`}
            >
              {isHighContrast ? "Normal Theme" : "High Contrast"}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'calendar', label: '📅 Calendar', icon: '📅' },
            { id: 'forecast', label: '🌟 Forecast', icon: '🌟' },
            { id: 'manifestation', label: '🌙 Manifestation', icon: '🌙' },
            { id: 'rituals', label: '🕯️ Rituals', icon: '🕯️' },
            { id: 'crystals', label: '💎 Crystals', icon: '💎' },
            { id: 'birth-chart', label: '🔮 Birth Chart', icon: '🔮' },
            { id: 'lunar-calendar', label: '📅 Lunar Calendar', icon: '📅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#FFD700] text-[#191970] font-bold"
                  : isHighContrast
                    ? "bg-black text-white border border-white hover:bg-white hover:text-black"
                    : "bg-[#232946]/50 text-[#C0C0C0] hover:bg-[#232946]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'calendar' && renderCalendar()}
          {activeTab === 'forecast' && renderForecast()}
          {activeTab === 'manifestation' && renderManifestation()}
          {activeTab === 'rituals' && renderRituals()}
          {activeTab === 'crystals' && renderCrystals()}
          {activeTab === 'birth-chart' && renderBirthChart()}
          {activeTab === 'lunar-calendar' && renderLunarCalendar()}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-2xl p-6 ${
              isHighContrast ? "bg-white text-black" : "bg-[#232946] border border-[#FFD700]/20"
            }`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{getEventIcon(selectedEvent.type)}</span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className={`text-2xl ${isHighContrast ? "text-black" : "text-[#FFD700]"}`}
                >
                  ×
                </button>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isHighContrast ? "text-black" : "text-[#FFD700]"}`}>
                {selectedEvent.title}
              </h3>
              <p className={`mb-4 ${isHighContrast ? "text-black" : "text-[#C0C0C0]"}`}>
                {selectedEvent.description}
              </p>
              <div className={`text-sm ${isHighContrast ? "text-black" : "text-[#C0C0C0]"}`}>
                <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                {selectedEvent.time && (
                  <p><strong>Time:</strong> {selectedEvent.time}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Share Button */}
        <div className="text-center mt-8">
          <ShareButton
            url={`${typeof window !== 'undefined' ? window.location.origin : ''}/enhanced-celestial-planner`}
            title="Enhanced Celestial Planner - Complete Lunar System"
            description="Track moon phases, discover rituals, and get cosmic guidance! 🌙✨"
            imageUrl="/images/crystals.svg"
          />
        </div>
      </div>
    </div>
  );
} 
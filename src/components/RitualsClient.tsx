"use client";

import React from 'react';
import { useState, useEffect } from "react";
import Link from "next/link";
import ShareButton from '@/components/ShareButton';

// Lunar phase calculation function
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

const lunarRituals = {
  new: {
    phase: "New Moon",
    emoji: "🌑",
    description: "A time for new beginnings and setting intentions",
    rituals: [
      {
        emoji: "🌱",
        title: "Seed Planting Ceremony",
        description: "Plant seeds (real or symbolic) while setting intentions for what you want to grow in your life.",
        energy: "New Beginnings & Manifestation",
        affirmation: "I plant the seeds of my dreams and trust in their growth."
      },
      {
        emoji: "📝",
        title: "Intention Setting Ritual",
        description: "Write your deepest desires and goals on a piece of paper. Fold it and place it under your pillow.",
        energy: "Clarity & Focus",
        affirmation: "My intentions are clear and my path is illuminated."
      },
      {
        emoji: "🕯️",
        title: "Candle of Hope",
        description: "Light a white candle and meditate on your hopes and dreams.",
        energy: "Hope & Possibility",
        affirmation: "I am open to new possibilities and embrace change."
      }
    ]
  },
  "waxing-crescent": {
    phase: "Waxing Crescent",
    emoji: "🌒",
    description: "A time for planning and gathering energy",
    rituals: [
      {
        emoji: "📚",
        title: "Knowledge Gathering",
        description: "Read, study, or learn something new that aligns with your intentions.",
        energy: "Learning & Preparation",
        affirmation: "I gather knowledge and wisdom to support my growth."
      },
      {
        emoji: "💎",
        title: "Crystal Charging",
        description: "Place your crystals in moonlight to charge them with the growing energy.",
        energy: "Energy & Power",
        affirmation: "I am gathering strength and energy for my journey."
      },
      {
        emoji: "🌿",
        title: "Herbal Blessing",
        description: "Create a small bundle of herbs that represent your goals.",
        energy: "Connection & Remembrance",
        affirmation: "I stay connected to my intentions and my path."
      }
    ]
  },
  "first-quarter": {
    phase: "First Quarter",
    emoji: "🌓",
    description: "A time for action and decision-making",
    rituals: [
      {
        emoji: "⚡",
        title: "Action Activation",
        description: "Take a concrete step toward your goals. The energy is perfect for making decisions.",
        energy: "Action & Momentum",
        affirmation: "I take bold action toward my dreams and goals."
      },
      {
        emoji: "🗣️",
        title: "Voice Your Truth",
        description: "Speak your intentions aloud to the universe. Share your goals with trusted friends.",
        energy: "Communication & Expression",
        affirmation: "I speak my truth with confidence and clarity."
      },
      {
        emoji: "🏃",
        title: "Movement Ritual",
        description: "Dance, walk, or move your body in a way that represents progress toward your goals.",
        energy: "Movement & Progress",
        affirmation: "I move forward with purpose and determination."
      }
    ]
  },
  "waxing-gibbous": {
    phase: "Waxing Gibbous",
    emoji: "🌔",
    description: "A time for refinement and fine-tuning",
    rituals: [
      {
        emoji: "🔧",
        title: "Refinement Ceremony",
        description: "Review and refine your plans. Make adjustments to align better with your highest good.",
        energy: "Refinement & Adjustment",
        affirmation: "I refine my path to align with my highest purpose."
      },
      {
        emoji: "🎯",
        title: "Focus Ritual",
        description: "Meditate on your goals with laser focus. Visualize success and feel the energy of achievement.",
        energy: "Focus & Visualization",
        affirmation: "I maintain unwavering focus on my goals."
      },
      {
        emoji: "✨",
        title: "Polish Your Intentions",
        description: "Polish a stone or crystal while thinking about polishing your intentions.",
        energy: "Perfection & Shine",
        affirmation: "My intentions shine brightly and attract success."
      }
    ]
  },
  full: {
    phase: "Full Moon",
    emoji: "🌕",
    description: "A time for celebration, release, and illumination",
    rituals: [
      {
        emoji: "🌕",
        title: "Full Moon Release Ritual",
        description: "Write down what you wish to release on a piece of paper. Light a candle, read your list aloud, and then safely burn the paper.",
        energy: "Letting Go & Renewal",
        affirmation: "I release what no longer serves me and make space for new blessings."
      },
      {
        emoji: "🕯️",
        title: "Moonlight Bath",
        description: "Take a ritual bath by moonlight. Add sea salt and essential oils to cleanse your energy.",
        energy: "Celebration & Cleansing",
        affirmation: "I celebrate my growth and cleanse my spirit."
      },
      {
        emoji: "🔮",
        title: "Divination Session",
        description: "Use tarot cards, runes, or other divination tools to gain insights under the full moon's energy.",
        energy: "Insight & Illumination",
        affirmation: "I receive clear guidance and illuminating insights."
      }
    ]
  },
  "waning-gibbous": {
    phase: "Waning Gibbous",
    emoji: "🌖",
    description: "A time for gratitude and sharing",
    rituals: [
      {
        emoji: "🙏",
        title: "Gratitude Ceremony",
        description: "Express gratitude for all you've received. Write thank you notes to the universe.",
        energy: "Gratitude & Appreciation",
        affirmation: "I am deeply grateful for all the blessings in my life."
      },
      {
        emoji: "🤝",
        title: "Sharing Ritual",
        description: "Share your knowledge, resources, or time with others. The energy supports giving back.",
        energy: "Sharing & Community",
        affirmation: "I share my gifts and support others on their journey."
      },
      {
        emoji: "📖",
        title: "Wisdom Integration",
        description: "Reflect on what you've learned and integrate the wisdom into your being.",
        energy: "Integration & Wisdom",
        affirmation: "I integrate my experiences and grow wiser each day."
      }
    ]
  },
  "last-quarter": {
    phase: "Last Quarter",
    emoji: "🌗",
    description: "A time for forgiveness and letting go",
    rituals: [
      {
        emoji: "💝",
        title: "Forgiveness Ritual",
        description: "Write down what you need to forgive yourself or others for. Burn the paper and release the burden.",
        energy: "Forgiveness & Release",
        affirmation: "I forgive myself and others, releasing all burdens."
      },
      {
        emoji: "🧹",
        title: "Space Clearing",
        description: "Clean and declutter your physical space to reflect the clearing of your inner space.",
        energy: "Clearing & Purification",
        affirmation: "I clear my space and make room for new energy."
      },
      {
        emoji: "🔄",
        title: "Completion Ceremony",
        description: "Acknowledge what you've completed and celebrate the endings that make way for new beginnings.",
        energy: "Completion & Transition",
        affirmation: "I honor my completions and welcome new cycles."
      }
    ]
  },
  "waning-crescent": {
    phase: "Waning Crescent",
    emoji: "🌘",
    description: "A time for rest, reflection, and preparation",
    rituals: [
      {
        emoji: "😴",
        title: "Rest and Renewal",
        description: "Take time to rest, meditate, and prepare for the new cycle. Honor your need for quiet.",
        energy: "Rest & Renewal",
        affirmation: "I honor my need for rest and prepare for new beginnings."
      },
      {
        emoji: "📝",
        title: "Reflection Journaling",
        description: "Write about what you've learned in this lunar cycle and what you want to carry forward.",
        energy: "Reflection & Integration",
        affirmation: "I reflect on my journey and integrate my lessons."
      },
      {
        emoji: "🛁",
        title: "Purification Bath",
        description: "Take a cleansing bath with Epsom salts to purify your energy and prepare for the new moon.",
        energy: "Purification & Preparation",
        affirmation: "I purify my energy and prepare for new possibilities."
      }
    ]
  }
};

function RitualModal({ ritual, onClose }: { ritual: any | null; onClose: () => void }) {
  if (!ritual) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 max-w-md w-full border border-[#FFD700]/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#FFD700] text-2xl hover:text-white focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
        <div className="text-center">
          <div className="text-6xl mb-2">{ritual.emoji}</div>
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-2">{ritual.title}</h2>
          <p className="text-[#C0C0C0] mb-4">{ritual.description}</p>
          <span className="inline-block text-xs text-[#FFD700] bg-[#232946] px-3 py-1 rounded-full mb-4">
            {ritual.energy}
          </span>
          <div className="bg-[#191970]/60 rounded-lg p-4 mt-4">
            <p className="text-[#FFD700] italic text-lg">"{ritual.affirmation}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RitualsClient() {
  const [currentPhase, setCurrentPhase] = useState<string>("new");
  const [openRitual, setOpenRitual] = useState<any | null>(null);

  useEffect(() => {
    setCurrentPhase(getLunarPhase());
  }, []);

  const phaseData = lunarRituals[currentPhase as keyof typeof lunarRituals];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
            🌙 Lunar Rituals
          </h1>
          <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 mb-8">
            <div className="text-6xl mb-4">{phaseData.emoji}</div>
            <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-2">
              {phaseData.phase}
            </h2>
            <p className="text-[#C0C0C0] text-lg">
              {phaseData.description}
            </p>
          </div>
          <p className="text-lg text-[#C0C0C0] max-w-xl mx-auto">
            These rituals are specially chosen to align with the current lunar phase. Harness the cosmic energy and let the magic unfold.
          </p>
        </div>
        <div className="space-y-8">
          {phaseData.rituals.map((ritual: any, idx: number) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="text-5xl md:text-6xl mb-2 md:mb-0">{ritual.emoji}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-2">
                  {ritual.title}
                </h2>
                <p className="text-[#C0C0C0] mb-2">{ritual.description}</p>
                <span className="inline-block text-xs text-[#FFD700] bg-[#232946] px-3 py-1 rounded-full mb-2">
                  {ritual.energy}
                </span>
                <div>
                  <button
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-5 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 mt-2"
                    onClick={() => setOpenRitual(ritual)}
                  >
                    Try this ritual
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
        {/* Featured Ritual */}
        <div className="bg-[#232946] rounded-lg p-8 mb-12">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-serif text-[#FFD700] font-bold mb-4">
              🌙 Featured Ritual: Full Moon Release Ceremony
            </h2>
            <ShareButton
              url={typeof window !== 'undefined' ? `${window.location.origin}/rituals` : '/rituals'}
              title="Sacred Lunar Rituals for Spiritual Growth"
              description="Discover powerful rituals to align with lunar energies and enhance your spiritual practice! 🌙"
              imageUrl="/images/full-moon.svg"
            />
          </div>
        </div>
      </div>
      <RitualModal ritual={openRitual} onClose={() => setOpenRitual(null)} />
    </div>
  );
} 
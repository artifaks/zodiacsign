"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ShareButton from '@/components/ShareButton';

interface Ritual {
  emoji: string;
  title: string;
  description: string;
  duration: string;
  materials: string[];
  steps: string[];
  affirmation: string;
  energy: string;
}

const ritualTypes = {
  morning: {
    title: "Morning Rituals",
    emoji: "🌅",
    description: "Start your day with cosmic energy and intention",
    rituals: [
      {
        emoji: "☀️",
        title: "Sun Salutation",
        description: "Greet the sun and align your energy with the new day",
        duration: "10-15 minutes",
        materials: ["Yoga mat", "Quiet space", "Optional: crystals"],
        steps: [
          "Find a quiet space where you can see the sunrise",
          "Stand with your feet together, hands at heart center",
          "Take 3 deep breaths, feeling the energy of the new day",
          "Perform 3-5 sun salutations, moving with your breath",
          "End with a moment of gratitude for the new day"
        ],
        affirmation: "I greet this new day with joy and purpose",
        energy: "Renewal & Vitality"
      },
      {
        emoji: "🕯️",
        title: "Morning Candle Ritual",
        description: "Light a candle to set your intentions for the day",
        duration: "5-10 minutes",
        materials: ["White candle", "Matches", "Quiet space"],
        steps: [
          "Sit comfortably in a quiet space",
          "Light your candle and watch the flame",
          "Take 3 deep breaths to center yourself",
          "Set 3 intentions for your day",
          "Close your eyes and visualize your day unfolding perfectly",
          "Extinguish the candle with gratitude"
        ],
        affirmation: "My day unfolds with grace and ease",
        energy: "Intention & Clarity"
      },
      {
        emoji: "💎",
        title: "Crystal Charging",
        description: "Charge your crystals with morning sunlight",
        duration: "5 minutes",
        materials: ["Your favorite crystals", "Windowsill or outdoor space"],
        steps: [
          "Choose 1-3 crystals that resonate with your intentions",
          "Place them in direct morning sunlight",
          "Set a timer for 5 minutes",
          "During this time, meditate on your goals",
          "Retrieve your crystals and carry them with you"
        ],
        affirmation: "I am energized and aligned with my highest purpose",
        energy: "Power & Alignment"
      }
    ]
  },
  evening: {
    title: "Evening Rituals",
    emoji: "🌙",
    description: "Wind down and prepare for restful sleep",
    rituals: [
      {
        emoji: "🛁",
        title: "Moonlight Bath",
        description: "Cleanse your energy and prepare for sleep",
        duration: "20-30 minutes",
        materials: ["Bath salts", "Essential oils", "Candles", "Quiet music"],
        steps: [
          "Fill your bath with warm water",
          "Add 1 cup of sea salt and 5-10 drops of lavender oil",
          "Light candles around the bathroom",
          "Soak for 20-30 minutes, focusing on releasing the day",
          "Visualize any stress or negativity dissolving into the water",
          "Rinse with cool water to seal in the cleansing"
        ],
        affirmation: "I release the day and prepare for peaceful rest",
        energy: "Cleansing & Release"
      },
      {
        emoji: "📝",
        title: "Gratitude Journaling",
        description: "Reflect on the day and express gratitude",
        duration: "10-15 minutes",
        materials: ["Journal", "Pen", "Quiet space"],
        steps: [
          "Find a comfortable, quiet space",
          "Write down 3 things you're grateful for today",
          "Reflect on one challenge and what you learned from it",
          "Write one intention for tomorrow",
          "Close with a moment of gratitude for yourself"
        ],
        affirmation: "I am grateful for all the blessings in my life",
        energy: "Gratitude & Reflection"
      },
      {
        emoji: "🧘",
        title: "Evening Meditation",
        description: "Calm your mind and prepare for sleep",
        duration: "10-15 minutes",
        materials: ["Comfortable cushion or chair", "Quiet space"],
        steps: [
          "Sit comfortably with your back straight",
          "Close your eyes and take 3 deep breaths",
          "Focus on your breath, counting 1-4 on inhale, 1-4 on exhale",
          "When thoughts arise, gently return to your breath",
          "Continue for 10-15 minutes",
          "End with a moment of gratitude"
        ],
        affirmation: "My mind is calm and my body is ready for rest",
        energy: "Peace & Tranquility"
      }
    ]
  },
  newmoon: {
    title: "New Moon Rituals",
    emoji: "🌑",
    description: "Set intentions and plant seeds for new beginnings",
    rituals: [
      {
        emoji: "🌱",
        title: "Intention Setting Ceremony",
        description: "Plant the seeds of your dreams and desires",
        duration: "20-30 minutes",
        materials: ["Paper and pen", "Small pot", "Seeds", "Candle"],
        steps: [
          "Light a candle and create a sacred space",
          "Write down 3-5 intentions for the coming lunar cycle",
          "Plant seeds in a small pot while focusing on your intentions",
          "Water the seeds and place them in a sunny spot",
          "Meditate on your intentions for 10 minutes",
          "Extinguish the candle with gratitude"
        ],
        affirmation: "I plant the seeds of my dreams and trust in their growth",
        energy: "New Beginnings & Manifestation"
      }
    ]
  },
  fullmoon: {
    title: "Full Moon Rituals",
    emoji: "🌕",
    description: "Release what no longer serves and celebrate your growth",
    rituals: [
      {
        emoji: "🔥",
        title: "Release Ritual",
        description: "Let go of what no longer serves your highest good",
        duration: "15-20 minutes",
        materials: ["Paper and pen", "Fire-safe bowl", "Matches", "Candle"],
        steps: [
          "Write down what you wish to release",
          "Light a candle and create a sacred space",
          "Read your list aloud to the universe",
          "Safely burn the paper in a fire-safe bowl",
          "Watch the smoke carry your releases away",
          "Express gratitude for the lessons learned"
        ],
        affirmation: "I release what no longer serves me and make space for new blessings",
        energy: "Release & Renewal"
      }
    ]
  }
};

export default function RitualTypePage() {
  const params = useParams();
  const type = params.type as string;
  const ritualData = ritualTypes[type as keyof typeof ritualTypes];

  if (!ritualData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-4">
            Ritual Not Found
          </h1>
          <p className="text-lg text-[#C0C0C0] mb-8">
            The ritual you're looking for doesn't exist in our cosmic collection.
          </p>
          <Link 
            href="/rituals"
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            Return to Rituals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{ritualData.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
            {ritualData.title}
          </h1>
          <p className="text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto">
            {ritualData.description}
          </p>
          <Link 
            href="/rituals"
            className="inline-flex items-center gap-2 bg-[#232946]/60 text-[#C0C0C0] hover:text-[#FFD700] px-4 py-2 rounded-lg transition-all duration-300 border border-[#FFD700]/20"
          >
            <span>←</span>
            <span>Back to All Rituals</span>
          </Link>
        </div>

        {/* Rituals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ritualData.rituals.map((ritual, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#1b1b3a] to-[#0a0a23] rounded-xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{ritual.emoji}</div>
              <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-3">
                {ritual.title}
              </h3>
              <p className="text-[#C0C0C0] mb-4">
                {ritual.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-[#FFD700]">
                  <span>⏱️</span>
                  <span>{ritual.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#FFD700]">
                  <span>⚡</span>
                  <span>{ritual.energy}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-[#FFD700] font-semibold mb-2">Materials Needed:</h4>
                <ul className="text-sm text-[#C0C0C0] space-y-1">
                  {ritual.materials.map((material, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span>•</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-[#FFD700] font-semibold mb-2">Steps:</h4>
                <ol className="text-sm text-[#C0C0C0] space-y-1">
                  {ritual.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#FFD700] font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-[#232946]/40 rounded-lg p-3 border border-[#FFD700]/20">
                <h4 className="text-[#FFD700] font-semibold mb-1">Affirmation:</h4>
                <p className="text-sm text-[#C0C0C0] italic">
                  "{ritual.affirmation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
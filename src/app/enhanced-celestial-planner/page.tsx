import EnhancedCelestialPlannerClient from "@/components/EnhancedCelestialPlannerClient";

export default function EnhancedCelestialPlannerPage() {
  return <EnhancedCelestialPlannerClient />;
}

export const metadata = {
  title: "Enhanced Celestial Planner - Free Lunar Calendar & Rituals",
  description: "Track all 2025-2026 celestial events, get real-time moon phase guidance, and discover rituals and crystal recommendations. Free, interactive, and mobile-friendly.",
  openGraph: {
    title: "Enhanced Celestial Planner - Free Lunar Calendar & Rituals",
    description: "Track all 2025-2026 celestial events, get real-time moon phase guidance, and discover rituals and crystal recommendations.",
    url: 'https://thecelestialcalendar.com/enhanced-celestial-planner',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Enhanced Celestial Planner - Lunar Calendar',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Enhanced Celestial Planner - Free Lunar Calendar & Rituals",
    description: "Track all 2025-2026 celestial events, get real-time moon phase guidance, and discover rituals and crystal recommendations.",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
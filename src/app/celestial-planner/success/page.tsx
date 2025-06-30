import CelestialPlannerSuccessClient from "@/components/CelestialPlannerSuccessClient";

export default function CelestialPlannerSuccessPage() {
  return <CelestialPlannerSuccessClient />;
}

export const metadata = {
  title: "Purchase Successful - Premium Celestial Planner Download",
  description: "Your Premium Celestial Planner 2025-2026 is ready for download. Access your comprehensive lunar ritual system, birth chart analysis, and cosmic guidance tools.",
  openGraph: {
    title: "Purchase Successful - Premium Celestial Planner Download",
    description: "Your Premium Celestial Planner 2025-2026 is ready for download. Access your comprehensive lunar ritual system, birth chart analysis, and cosmic guidance tools.",
    url: 'https://thecelestialcalendar.com/celestial-planner/success',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Premium Celestial Planner Download',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Purchase Successful - Premium Celestial Planner Download",
    description: "Your Premium Celestial Planner 2025-2026 is ready for download. Access your comprehensive lunar ritual system, birth chart analysis, and cosmic guidance tools.",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: false,
    follow: false,
  },
}; 
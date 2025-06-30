import BirthChartClient from "@/components/BirthChartClient";

export default function BirthChartPage() {
  return <BirthChartClient />;
}

export const metadata = {
  title: "Birth Chart Calculator - Discover Your Cosmic Blueprint",
  description: "Reveal your Sun & Moon signs and receive a mystical interpretation. Use our free birth chart calculator for instant astrological insights.",
  openGraph: {
    title: "Birth Chart Calculator - Discover Your Cosmic Blueprint",
    description: "Reveal your Sun & Moon signs and receive a mystical interpretation. Use our free birth chart calculator for instant astrological insights.",
    url: 'https://thecelestialcalendar.com/birth-chart',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Birth Chart Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Birth Chart Calculator - Discover Your Cosmic Blueprint",
    description: "Reveal your Sun & Moon signs and receive a mystical interpretation. Use our free birth chart calculator for instant astrological insights.",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
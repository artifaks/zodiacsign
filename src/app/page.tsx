import HomeClient from "@/components/HomeClient";

export default function Home() {
  return <HomeClient />;
}

export const metadata = {
  title: "Celestial Calendar - Daily Horoscopes, Rituals & Cosmic Guidance",
  description: "Your mystical portal for daily horoscopes, lunar wisdom, and cosmic rituals. Awaken your magic every day with forecasts, rituals, and personalized astrological insights.",
  openGraph: {
    title: "Celestial Calendar - Daily Horoscopes, Rituals & Cosmic Guidance",
    description: "Your mystical portal for daily horoscopes, lunar wisdom, and cosmic rituals. Awaken your magic every day!",
    url: 'https://thecelestialcalendar.com',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Celestial Calendar - Mystical Astrology Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Celestial Calendar - Daily Horoscopes, Rituals & Cosmic Guidance",
    description: "Your mystical portal for daily horoscopes, lunar wisdom, and cosmic rituals. Awaken your magic every day!",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
};

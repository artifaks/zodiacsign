import HoroscopeClient from "@/components/HoroscopeClient";

export default function HoroscopePage() {
  return <HoroscopeClient />;
}

export const metadata = {
  title: "Daily Horoscope - Free Zodiac Forecasts | Celestial Calendar",
  description: "Get your free daily horoscope and cosmic forecast for all zodiac signs. Discover what the stars have in store for you today!",
  openGraph: {
    title: "Daily Horoscope - Free Zodiac Forecasts | Celestial Calendar",
    description: "Get your free daily horoscope and cosmic forecast for all zodiac signs. Discover what the stars have in store for you today!",
    url: 'https://thecelestialcalendar.com/horoscope',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Daily Horoscope',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daily Horoscope - Free Zodiac Forecasts | Celestial Calendar",
    description: "Get your free daily horoscope and cosmic forecast for all zodiac signs. Discover what the stars have in store for you today!",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
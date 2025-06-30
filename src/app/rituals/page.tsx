import RitualsClient from "@/components/RitualsClient";

export default function RitualsPage() {
  return <RitualsClient />;
}

export const metadata = {
  title: "Lunar Rituals & Spiritual Practices | Celestial Calendar",
  description: "Discover powerful rituals to align with lunar energies and enhance your spiritual practice. Step-by-step guides for every moon phase.",
  openGraph: {
    title: "Lunar Rituals & Spiritual Practices | Celestial Calendar",
    description: "Discover powerful rituals to align with lunar energies and enhance your spiritual practice. Step-by-step guides for every moon phase.",
    url: 'https://thecelestialcalendar.com/rituals',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/full-moon.svg',
        width: 1200,
        height: 630,
        alt: 'Lunar Rituals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Lunar Rituals & Spiritual Practices | Celestial Calendar",
    description: "Discover powerful rituals to align with lunar energies and enhance your spiritual practice. Step-by-step guides for every moon phase.",
    images: ['/images/full-moon.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
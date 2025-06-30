import EbookClient from "@/components/EbookClient";

// 'use client' removed to allow export const metadata

export default function EbookPage() {
  return <EbookClient />;
}

export const metadata = {
  title: "Mystical eBooks & Guides | Celestial Calendar",
  description: "Discover ancient wisdom and cosmic insights through our curated eBooks. Download guides on astrology, rituals, and spiritual growth for your journey.",
  openGraph: {
    title: "Mystical eBooks & Guides | Celestial Calendar",
    description: "Discover ancient wisdom and cosmic insights through our curated eBooks. Download guides on astrology, rituals, and spiritual growth for your journey.",
    url: 'https://thecelestialcalendar.com/ebook',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Celestial Calendar eBooks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mystical eBooks & Guides | Celestial Calendar",
    description: "Discover ancient wisdom and cosmic insights through our curated eBooks. Download guides on astrology, rituals, and spiritual growth for your journey.",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
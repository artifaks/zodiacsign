import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return <ShopClient />;
}

export const metadata = {
  title: "Shop Spiritual Tools & Planners | Celestial Calendar",
  description: "Shop premium lunar planners, ritual guides, crystal sets, and more. Support your moon-aligned journey with curated spiritual tools and instant digital downloads.",
  openGraph: {
    title: "Shop Spiritual Tools & Planners | Celestial Calendar",
    description: "Shop premium lunar planners, ritual guides, crystal sets, and more. Support your moon-aligned journey with curated spiritual tools and instant digital downloads.",
    url: 'https://thecelestialcalendar.com/shop',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Celestial Calendar Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shop Spiritual Tools & Planners | Celestial Calendar",
    description: "Shop premium lunar planners, ritual guides, crystal sets, and more. Support your moon-aligned journey with curated spiritual tools and instant digital downloads.",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
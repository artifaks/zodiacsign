import MembershipClient from "@/components/MembershipClient";

export default function MembershipPage() {
  return <MembershipClient />;
}

export const metadata = {
  title: "Celestial Gold Membership - Premium Astrology & Rituals",
  description: "Unlock exclusive cosmic insights, personalized rituals, and premium astrological content with Celestial Gold Membership. Join our spiritual community today!",
  openGraph: {
    title: "Celestial Gold Membership - Premium Astrology & Rituals",
    description: "Unlock exclusive cosmic insights, personalized rituals, and premium astrological content with Celestial Gold Membership. Join our spiritual community today!",
    url: 'https://thecelestialcalendar.com/membership',
    siteName: 'Celestial Calendar',
    images: [
      {
        url: '/images/crystals.svg',
        width: 1200,
        height: 630,
        alt: 'Celestial Gold Membership',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Celestial Gold Membership - Premium Astrology & Rituals",
    description: "Unlock exclusive cosmic insights, personalized rituals, and premium astrological content with Celestial Gold Membership. Join our spiritual community today!",
    images: ['/images/crystals.svg'],
    creator: '@celestialcalendar',
  },
  robots: {
    index: true,
    follow: true,
  },
}; 
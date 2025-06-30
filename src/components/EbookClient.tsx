"use client";

import { useState } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import ShareButton from '@/components/ShareButton';
import { ebooks as ebooksConfig, Ebook } from '@/config/ebooks';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function EbookClient() {
  const [selectedBook, setSelectedBook] = useState<Ebook>(ebooksConfig[0]);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (ebook: Ebook) => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: ebook.priceId,
          successUrl: typeof window !== 'undefined' ? `${window.location.origin}/ebook/success` : '/ebook/success',
          cancelUrl: typeof window !== 'undefined' ? `${window.location.origin}/ebook` : '/ebook',
          ebookId: ebook.id,
          ebookTitle: ebook.title,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error:', error);
          alert('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#FFD700] font-bold mb-6 drop-shadow-lg">
            🌟 Mystical Knowledge Collection
          </h1>
          <p className="text-xl md:text-2xl text-[#C0C0C0] max-w-4xl mx-auto mb-8">
            Discover ancient wisdom and cosmic insights through our carefully curated eBooks
          </p>
          <p className="text-lg text-[#C0C0C0] max-w-3xl mx-auto mb-8">
            Each book is a gateway to deeper understanding, blending traditional knowledge with modern insights for your spiritual and personal growth journey.
          </p>
          <div className="flex justify-center">
            <ShareButton
              url={typeof window !== 'undefined' ? `${window.location.origin}/ebook` : '/ebook'}
              title="Mystical Knowledge Collection - Ancient Wisdom for Modern Seekers"
              description="Discover transformative eBooks on astrology, herbal healing, and cosmic wisdom! 📖✨"
              imageUrl="/images/crystals.svg"
            />
          </div>
        </div>

        {/* eBook Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-[#FFD700] font-bold text-center mb-8">
            Choose Your Journey
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {ebooksConfig.map((ebook) => (
              <div
                key={ebook.id}
                className={`bg-[#232946] rounded-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
                  selectedBook.id === ebook.id
                    ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                    : 'border-transparent hover:border-[#FFD700]/50'
                }`}
                onClick={() => setSelectedBook(ebook)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <Image
                      src={ebook.coverImage}
                      alt={`${ebook.title} cover`}
                      width={64}
                      height={80}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif text-[#FFD700] font-bold mb-2">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-[#C0C0C0] line-clamp-2">
                      {ebook.subtitle}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-[#FFD700] font-bold">$4.99</span>
                      <span className="text-[#C0C0C0] text-sm ml-2">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected eBook Details */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Product Details */}
          <div className="space-y-8">
            {/* eBook Cover */}
            <div className="bg-[#232946] rounded-lg p-8 text-center">
              <div className="relative w-full max-w-sm mx-auto mb-6">
                <Image
                  src={selectedBook.coverImage}
                  alt={`${selectedBook.title} - eBook Cover`}
                  width={300}
                  height={400}
                  className="rounded-lg shadow-2xl border-2 border-[#FFD700]/20 object-cover w-full h-auto"
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-[#FFD700] text-[#191970] px-3 py-1 rounded-full text-sm font-bold">
                  NEW
                </div>
              </div>
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
                Beautiful Digital Edition
              </h2>
              <p className="text-[#C0C0C0]">
                High-quality PDF with stunning visuals, interactive elements, and professional layout designed for the best reading experience.
              </p>
            </div>

            <div className="bg-[#232946] rounded-lg p-8">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                What You'll Discover Inside
              </h2>
              <div className="space-y-4 text-[#C0C0C0]">
                {selectedBook.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-[#FFD700] mr-3 mt-1">✨</span>
                    <div>
                      <p>{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#232946] rounded-lg p-8">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                Key Features
              </h2>
              <ul className="space-y-3 text-[#C0C0C0]">
                {selectedBook.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#FFD700] mr-3">📖</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#232946] rounded-lg p-8">
              <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
                Perfect For
              </h2>
              <div className="grid grid-cols-1 gap-4 text-[#C0C0C0]">
                {selectedBook.targetAudience.map((audience, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-[#FFD700] mr-2">⭐</span>
                    <span>{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Pricing & Purchase */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-[#FFD700] to-[#FFED4E] rounded-lg p-8 text-[#191970]">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-bold mb-4">
                  Special Launch Price
                </h2>
                <div className="mb-6">
                  <span className="text-6xl font-bold">$4.99</span>
                  <span className="text-xl ml-2">USD</span>
                </div>
                <div className="text-sm mb-6">
                  <span className="line-through text-gray-600">$24.99</span>
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    80% OFF
                  </span>
                </div>
                <button
                  onClick={() => handlePurchase(selectedBook)}
                  disabled={loading}
                  className="w-full bg-[#191970] text-[#FFD700] py-4 px-8 rounded-lg font-bold text-lg hover:bg-[#232946] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `✨ Get ${selectedBook.title.split(':')[0]} Now ✨`}
                </button>
                <p className="text-sm mt-4 text-gray-600">
                  Secure payment via Stripe • Instant download
                </p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-[#232946] rounded-lg p-8">
              <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-6">
                What Readers Are Saying
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#FFD700] pl-4">
                  <p className="text-[#C0C0C0] italic mb-2">
                    "This book masterfully weaves together ancient wisdom with modern insights. A must-read for anyone on a spiritual journey."
                  </p>
                  <p className="text-[#FFD700] font-semibold">- Dr. Sarah Chen, Holistic Practitioner</p>
                </div>
                <div className="border-l-4 border-[#FFD700] pl-4">
                  <p className="text-[#C0C0C0] italic mb-2">
                    "Finally, a comprehensive guide that connects traditional knowledge with contemporary understanding. The insights are transformative!"
                  </p>
                  <p className="text-[#FFD700] font-semibold">- Marcus Rodriguez, Wellness Coach</p>
                </div>
                <div className="border-l-4 border-[#FFD700] pl-4">
                  <p className="text-[#C0C0C0] italic mb-2">
                    "Whether you're a beginner or experienced practitioner, this book offers valuable insights that will enhance your understanding and practice."
                  </p>
                  <p className="text-[#FFD700] font-semibold">- Luna Starlight, Spiritual Guide</p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-[#232946] rounded-lg p-8 text-center">
              <div className="text-[#FFD700] text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-4">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-[#C0C0C0]">
                If you're not completely satisfied with your purchase, we'll refund your money within 30 days. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="bg-[#232946] rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-serif text-[#FFD700] font-bold text-center mb-8">
            About This Book
          </h2>
          <div className="text-[#C0C0C0] space-y-6 text-lg leading-relaxed">
            {selectedBook.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {/* ... (rest of the FAQ and any additional content) ... */}
      </div>
    </div>
  );
} 
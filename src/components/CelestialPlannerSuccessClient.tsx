"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');
  const productId = searchParams.get('product_id');

  useEffect(() => {
    if (sessionId && productId) {
      generateDownloadLink();
    } else {
      setError('Missing session or product information');
      setIsLoading(false);
    }
  }, [sessionId, productId]);

  const generateDownloadLink = async () => {
    try {
      const response = await fetch('/api/get-celestial-planner-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadUrl(data.downloadUrl);
      } else {
        setError(data.error || 'Failed to generate download link');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#FFD700] mb-2">Processing Your Purchase</h1>
          <p className="text-[#C0C0C0]">Preparing your download...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] px-4">
        <div className="text-center max-w-md">
          <span className="text-6xl mb-4 block">❌</span>
          <h1 className="text-2xl font-bold text-[#FFD700] mb-4">Download Error</h1>
          <p className="text-[#C0C0C0] mb-6">{error}</p>
          <Link 
            href="/shop" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] text-[#191970] font-bold shadow hover:scale-105 transition-transform"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] px-4">
      <div className="text-center max-w-2xl">
        <span className="text-6xl mb-4 block">🌟</span>
        <h1 className="text-3xl font-bold text-[#FFD700] mb-4">Thank You for Your Purchase!</h1>
        <p className="text-lg text-[#C0C0C0] mb-8">
          Your Premium Celestial Planner 2025-2026 is ready for download. 
          This comprehensive package includes everything you need for your celestial journey.
        </p>
        
        <div className="bg-[#232946]/50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-[#FFD700] mb-4">What's Included:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#FFD700] font-semibold mb-2">🌟 Core Features</h3>
              <ul className="text-[#C0C0C0] space-y-2 text-sm">
                <li className="flex items-center gap-2">✓ Complete Moon Phase Ritual System</li>
                <li className="flex items-center gap-2">✓ Birth Chart Calculator & Analysis</li>
                <li className="flex items-center gap-2">✓ Daily Horoscope Generator</li>
                <li className="flex items-center gap-2">✓ Crystal Healing Guide</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#FFD700] font-semibold mb-2">🌙 Ritual & Practice Tools</h3>
              <ul className="text-[#C0C0C0] space-y-2 text-sm">
                <li className="flex items-center gap-2">✓ 8 Lunar Phase Rituals</li>
                <li className="flex items-center gap-2">✓ Personalized Affirmations</li>
                <li className="flex items-center gap-2">✓ Step-by-step Instructions</li>
                <li className="flex items-center gap-2">✓ Cosmic Energy Guidance</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#FFD700]/20">
            <h3 className="text-[#FFD700] font-semibold mb-2">📱 Digital Tools</h3>
            <ul className="text-[#C0C0C0] space-y-2 text-sm">
              <li className="flex items-center gap-2">✓ Printable Ritual Templates</li>
              <li className="flex items-center gap-2">✓ Cosmic AI Assistant (Luna)</li>
              <li className="flex items-center gap-2">✓ Daily Ritual Recommendations</li>
              <li className="flex items-center gap-2">✓ Share & Save Features</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#191970] font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200 mb-6"
        >
          Download Premium Celestial Planner
        </button>
        
        <p className="text-[#C0C0C0] text-sm mb-8">
          The download will start automatically. If it doesn't, click the button above.
        </p>

        <div className="space-y-4">
          <Link 
            href="/shop" 
            className="block px-6 py-3 rounded-lg border border-[#FFD700]/30 text-[#FFD700] font-semibold hover:bg-[#FFD700]/10 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="block px-6 py-3 rounded-lg border border-[#C0C0C0]/30 text-[#C0C0C0] font-semibold hover:bg-[#C0C0C0]/10 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CelestialPlannerSuccessClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#FFD700] mb-2">Loading...</h1>
          <p className="text-[#C0C0C0]">Preparing your success page...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
} 
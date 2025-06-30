"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

function EbookSuccessContent() {
  const searchParams = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ebookTitle, setEbookTitle] = useState<string>('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const ebookId = searchParams.get('ebook_id');

    if (sessionId && ebookId) {
      generateDownloadLink(sessionId, ebookId);
    } else {
      setError('Missing session information');
      setLoading(false);
    }
  }, [searchParams]);

  const generateDownloadLink = async (sessionId: string, ebookId: string) => {
    try {
      const response = await fetch('/api/get-ebook-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          ebookId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDownloadUrl(data.downloadUrl);
        // Set eBook title based on ID
        if (ebookId === 'celestial-rhythms') {
          setEbookTitle('Celestial Rhythms: Navigating the Cosmos Through Time');
        } else if (ebookId === 'herbal-healing') {
          setEbookTitle('Herbal Healing: A Beginner\'s Journey into Natural Medicine');
        }
      } else {
        setError(data.error || 'Failed to generate download link');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700] mx-auto mb-8"></div>
          <h1 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
            Preparing Your Download
          </h1>
          <p className="text-[#C0C0C0]">
            Please wait while we generate your secure download link...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-8">❌</div>
          <h1 className="text-3xl font-serif text-[#FFD700] font-bold mb-6">
            Download Error
          </h1>
          <p className="text-[#C0C0C0] mb-8">
            {error}
          </p>
          <Link
            href="/ebook"
            className="bg-[#FFD700] text-[#191970] py-3 px-8 rounded-lg font-bold hover:bg-[#FFED4E] transition-colors"
          >
            Return to eBooks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-8">🎉</div>
        <h1 className="text-4xl font-serif text-[#FFD700] font-bold mb-6">
          Thank You for Your Purchase!
        </h1>
        <p className="text-xl text-[#C0C0C0] mb-8">
          Your mystical journey begins now. Your eBook is ready for download.
        </p>
        
        <div className="bg-[#232946] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
            {ebookTitle}
          </h2>
          <p className="text-[#C0C0C0] mb-6">
            Your digital copy is ready to download. Click the button below to start your journey.
          </p>
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFED4E] text-[#191970] py-4 px-8 rounded-lg font-bold text-lg hover:from-[#FFED4E] hover:to-[#FFD700] transition-all transform hover:scale-105"
          >
            📖 Download Your eBook
          </button>
        </div>

        <div className="bg-[#232946] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-4">
            What&apos;s Next?
          </h3>
          <div className="text-left space-y-3 text-[#C0C0C0]">
            <div className="flex items-start">
              <span className="text-[#FFD700] mr-3 mt-1">📧</span>
              <div>
                <p className="font-semibold">Check Your Email</p>
                <p className="text-sm">You&apos;ll receive a confirmation email with your download link.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FFD700] mr-3 mt-1">💾</span>
              <div>
                <p className="font-semibold">Save Your eBook</p>
                <p className="text-sm">Download and save the PDF to your device for offline reading.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FFD700] mr-3 mt-1">🔄</span>
              <div>
                <p className="font-semibold">Lifetime Access</p>
                <p className="text-sm">You have lifetime access to this eBook and any future updates.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block bg-[#FFD700] text-[#191970] py-3 px-8 rounded-lg font-bold hover:bg-[#FFED4E] transition-colors"
          >
            🌟 Return to Home
          </Link>
          <Link
            href="/ebook"
            className="block bg-transparent border-2 border-[#FFD700] text-[#FFD700] py-3 px-8 rounded-lg font-bold hover:bg-[#FFD700] hover:text-[#191970] transition-colors"
          >
            📚 Browse More eBooks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function EbookSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFD700] mx-auto mb-8"></div>
          <h1 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <EbookSuccessContent />
    </Suspense>
  );
} 
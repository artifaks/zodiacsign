"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ShareButton from './ShareButton';

export default function FloatingShareButton() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setCurrentTitle(document.title || 'Celestial Calendar - Your Cosmic Journey');
    }
  }, []);

  if (!currentUrl) return null;

  return (
    <ShareButton 
      url={currentUrl}
      title={currentTitle}
      description="Discover your birth chart, daily rituals, and cosmic forecasts with AI-powered insights"
      variant="floating"
    />
  );
} 
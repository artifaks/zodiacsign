"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  variant?: 'floating' | 'inline';
}

export default function ShareButton({ 
  url, 
  title, 
  description = 'Check out this cosmic wisdom!', 
  imageUrl,
  className = '',
  variant = 'inline'
}: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    }

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        const pinterestImage = imageUrl && typeof window !== 'undefined' ? `${window.location.origin}${imageUrl}` : '';
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(pinterestImage)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\nRead more: ${url}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          showSuccessNotification('Link copied to clipboard! ✨');
        });
        return;
    }
    
    if (shareUrl) {
      if (typeof window !== 'undefined') {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    }
    setShowShareMenu(false);
  };

  const sharePlatforms = [
    { key: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-[#1DA1F2]' },
    { key: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-[#4267B2]' },
    { key: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-[#0077B5]' },
    { key: 'pinterest', name: 'Pinterest', icon: '📌', color: 'bg-[#E60023]' },
    { key: 'whatsapp', name: 'WhatsApp', icon: '💬', color: 'bg-[#25D366]' },
    { key: 'telegram', name: 'Telegram', icon: '📡', color: 'bg-[#0088CC]' },
    { key: 'email', name: 'Email', icon: '📧', color: 'bg-[#EA4335]' },
    { key: 'copy', name: 'Copy Link', icon: '📋', color: 'bg-[#FFD700] text-black' },
  ];

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold p-4 rounded-full shadow-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 transform hover:scale-110"
        >
          <span className="text-2xl">🌟</span>
        </button>
        
        {showShareMenu && (
          <div ref={menuRef} className="absolute bottom-16 right-0 bg-[#232946] border border-[#FFD700]/20 rounded-xl p-4 shadow-xl min-w-[200px]">
            <h3 className="text-[#FFD700] font-semibold mb-3 text-center">Share</h3>
            <div className="grid grid-cols-2 gap-2">
              {sharePlatforms.map(platform => (
                <button
                  key={platform.key}
                  onClick={() => handleShare(platform.key)}
                  className={`${platform.color} hover:opacity-80 text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center gap-2`}
                >
                  <span>{platform.icon}</span>
                  <span className="hidden sm:inline">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Success Notification */}
        {showNotification && (
          <div className="absolute bottom-16 right-0 bg-[#25D366] text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <span>✨</span>
              <span>{notificationMessage}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-4 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
      >
        <span>🌟</span>
        <span>Share</span>
      </button>
      
      {showShareMenu && (
        <div ref={menuRef} className="absolute top-full left-0 mt-2 bg-[#232946] border border-[#FFD700]/20 rounded-xl p-4 shadow-xl min-w-[200px] z-50">
          <h3 className="text-[#FFD700] font-semibold mb-3 text-center">Share on</h3>
          <div className="grid grid-cols-2 gap-2">
            {sharePlatforms.map(platform => (
              <button
                key={platform.key}
                onClick={() => handleShare(platform.key)}
                className={`${platform.color} hover:opacity-80 text-white px-3 py-2 rounded-lg transition-all duration-300 text-sm flex items-center gap-2`}
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Success Notification */}
      {showNotification && (
        <div className="absolute top-full left-0 mt-2 bg-[#25D366] text-white px-4 py-2 rounded-lg shadow-lg animate-pulse z-50">
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
} 
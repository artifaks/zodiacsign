'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const navLinks = [
  { href: "/forecast", label: "Forecast", icon: "\uD83E\uDE90" },
  { href: "/horoscope", label: "Horoscope", icon: "\uD83D\uDD2E" },
  { href: "/birth-chart", label: "Birth Chart", icon: "\u2B50" },
  { href: "/rituals", label: "Rituals", icon: "\uD83C\uDF19" },
  { href: "/enhanced-celestial-planner", label: "Enhanced Planner", icon: "\uD83C\uDF1F" },
  { href: "/ebook", label: "eBook", icon: "\uD83D\uDCD6" },
  { href: "/shop", label: "Shop", icon: "\uD83D\uDED2" },
  { href: "/membership", label: "Celestial Gold", icon: "\uD83E\uDDD8" },
  { href: "/blog", label: "Blog", icon: "\uD83D\uDCF0" },
  { href: "/contact", label: "Contact", icon: "\uD83D\uDCE9" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#191970]/80 backdrop-blur-md shadow-lg border-b border-[#FFD700]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl text-[#FFD700] font-serif tracking-widest">☽</span>
            <span className="text-sm text-[#FFD700] font-semibold font-serif tracking-wide">Celestial Calendar</span>
          </div>
          
          <ul className="flex gap-4 md:gap-8 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-1 text-[#C0C0C0] hover:text-[#FFD700] transition-colors font-medium text-base px-2 py-1 rounded-lg hover:bg-[#232946]/60">
                  <span className="text-xl" aria-hidden>{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              </li>
            ))}
            
            {/* Auth Section */}
            <li className="ml-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-[#C0C0C0] hover:text-[#FFD700] transition-colors font-medium text-base px-3 py-2 rounded-lg hover:bg-[#232946]/60"
                  >
                    <span className="text-xl">👤</span>
                    <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                    <span className="text-sm">▼</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-lg shadow-xl border border-[#FFD700]/20 py-2">
                      <div className="px-4 py-2 text-sm text-[#C0C0C0] border-b border-[#FFD700]/10">
                        {user.email}
                      </div>
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#1a1a2e]/50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        🌟 My Profile
                      </Link>
                      <Link 
                        href="/birth-chart" 
                        className="block px-4 py-2 text-sm text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#1a1a2e]/50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        🔮 My Birth Chart
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-[#C0C0C0] hover:text-[#FFD700] hover:bg-[#1a1a2e]/50"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-[#C0C0C0] hover:text-[#FFD700] transition-colors font-medium text-sm px-3 py-2 rounded-lg hover:bg-[#232946]/60"
                  >
                    🔮 Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-4 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 text-sm"
                  >
                    ✨ Join
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode} 
      />
    </>
  );
} 
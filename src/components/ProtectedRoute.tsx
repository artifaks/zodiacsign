'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23]">
        <div className="text-center">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-[#C0C0C0] text-lg">Checking your cosmic access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23]">
        <div className="text-center">
          <div className="text-4xl mb-4">🔮</div>
          <p className="text-[#C0C0C0] text-lg mb-4">Please sign in to access this page</p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 
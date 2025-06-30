'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error } = mode === 'signin' 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        setError(error.message);
      } else {
        if (mode === 'signup') {
          setMessage('Check your email for a confirmation link!');
        } else {
          onClose();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Show setup message if Supabase isn't configured
  if (!supabase) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 max-w-md w-full border border-[#FFD700]/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-[#FFD700]">
              🔧 Setup Required
            </h2>
            <button
              onClick={onClose}
              className="text-[#C0C0C0] hover:text-[#FFD700] text-2xl"
            >
              ×
            </button>
          </div>

          <div className="text-center">
            <p className="text-[#C0C0C0] mb-4">
              To enable authentication, you need to set up Supabase.
            </p>
            <div className="bg-[#1a1a2e] rounded-lg p-4 text-left text-sm">
              <p className="text-[#C0C0C0] mb-2">Create a <code className="bg-[#232946] px-2 py-1 rounded">.env.local</code> file with:</p>
              <code className="bg-[#232946] px-2 py-1 rounded block text-xs">
                NEXT_PUBLIC_SUPABASE_URL=your_project_url<br/>
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
              </code>
            </div>
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#FFD700] hover:underline"
            >
              Get started at supabase.com →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 max-w-md w-full border border-[#FFD700]/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-[#FFD700]">
            {mode === 'signin' ? '🔮 Welcome Back' : '✨ Join the Cosmos'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#C0C0C0] hover:text-[#FFD700] text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#C0C0C0] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#C0C0C0] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#FFD700]/30 rounded-lg text-white focus:border-[#FFD700] focus:outline-none"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="text-green-400 text-sm bg-green-900/20 p-3 rounded-lg">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 px-6 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? '✨ Connecting to the Cosmos...' : 
             mode === 'signin' ? '🔮 Sign In' : '✨ Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#C0C0C0] text-sm">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => typeof window !== 'undefined' && window.location.reload()}
              className="text-[#FFD700] hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 
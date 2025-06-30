'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase, BirthChart, JournalEntry } from '../../lib/supabase';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import ShareButton from '@/components/ShareButton';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [birthChart, setBirthChart] = useState<BirthChart | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      loadUserData();
    }
  }, [user, loading]);

  const loadUserData = async () => {
    if (!user || !supabase) return;

    try {
      // Load birth chart
      const { data: chartData } = await supabase
        .from('birth_charts')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (chartData) {
        setBirthChart(chartData);
      }

      // Load journal entries
      const { data: journalData } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (journalData) {
        setJournalEntries(journalData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23]">
        <div className="text-center">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-[#C0C0C0] text-lg">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  // Show setup message if Supabase isn't configured
  if (!supabase) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
            <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-6 drop-shadow-lg">
              🔧 Setup Required
            </h1>
            <p className="text-lg text-[#C0C0C0] mb-6">
              To enable user profiles and authentication, you need to set up Supabase.
            </p>
            <div className="bg-[#1a1a2e] rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="text-[#FFD700] font-bold mb-4">Setup Steps:</h3>
              <ol className="text-[#C0C0C0] space-y-2 text-sm">
                <li>1. Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#FFD700] hover:underline">supabase.com</a></li>
                <li>2. Get your project URL and anon key from Settings → API</li>
                <li>3. Create a <code className="bg-[#232946] px-2 py-1 rounded">.env.local</code> file with:</li>
                <li className="ml-4">
                  <code className="bg-[#232946] px-2 py-1 rounded block">
                    NEXT_PUBLIC_SUPABASE_URL=your_project_url<br/>
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                  </code>
                </li>
                <li>4. Run the SQL commands from the README to set up your database</li>
                <li>5. Restart your development server</li>
              </ol>
            </div>
            <Link 
              href="/"
              className="inline-block mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
              🌟 Your Cosmic Profile
            </h1>
            <p className="text-lg text-[#C0C0C0]">
              Welcome back, {user?.email?.split('@')[0]}! Here's your celestial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Account Info */}
            <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20">
              <h2 className="text-2xl font-serif text-[#FFD700] mb-4">👤 Account Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-[#C0C0C0] text-sm">Email</label>
                  <p className="text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="text-[#C0C0C0] text-sm">Member Since</label>
                  <p className="text-white">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-[#C0C0C0] text-sm">Status</label>
                  <p className="text-green-400">✨ Active Member</p>
                </div>
              </div>
            </div>

            {/* Birth Chart */}
            <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20">
              <h2 className="text-2xl font-serif text-[#FFD700] mb-4">🔮 Birth Chart</h2>
              {birthChart ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[#C0C0C0] text-sm">Sun Sign</label>
                    <p className="text-white text-lg">{birthChart.sun_sign}</p>
                  </div>
                  <div>
                    <label className="text-[#C0C0C0] text-sm">Moon Sign</label>
                    <p className="text-white text-lg">{birthChart.moon_sign}</p>
                  </div>
                  <Link 
                    href="/birth-chart"
                    className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-4 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 text-sm"
                  >
                    View Full Chart
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#C0C0C0] mb-4">No birth chart found</p>
                  <Link 
                    href="/birth-chart"
                    className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-4 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
                  >
                    Create Birth Chart
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Journal Entries */}
          <div className="mt-12 bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20">
            <h2 className="text-2xl font-serif text-[#FFD700] mb-6">📝 Recent Journal Entries</h2>
            {journalEntries.length > 0 ? (
              <div className="space-y-4">
                {journalEntries.map((entry) => (
                  <div key={entry.id} className="bg-[#1a1a2e] rounded-lg p-4 border border-[#FFD700]/10">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#FFD700] font-medium">{entry.prompt}</h3>
                      <span className="text-[#C0C0C0] text-sm">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {entry.response && (
                      <p className="text-[#C0C0C0] text-sm">{entry.response}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#C0C0C0] mb-4">No journal entries yet</p>
                <Link 
                  href="/"
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-4 py-2 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
                >
                  Start Journaling
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href="/forecast"
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              🪐 Today's Forecast
            </Link>
            <Link 
              href="/rituals"
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              🌙 Daily Rituals
            </Link>
            <Link 
              href="/membership"
              className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              ✨ Upgrade to Gold
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 
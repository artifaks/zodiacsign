"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

interface Comment {
  id: string;
  blog_post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  is_approved: boolean;
  created_at: string;
  blog_post?: {
    title: string;
  };
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      if (!supabase) {
        console.log('Supabase not available, using fallback data');
        // Fallback data for demo
        const fallbackComments: Comment[] = [
          {
            id: '1',
            blog_post_id: 'demo-1',
            author_name: 'Starlight Seeker',
            author_email: 'starlight@example.com',
            content: 'This article really resonated with me! The insights about lunar energy are spot on.',
            is_approved: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            blog_post: { title: 'The Power of the Full Moon' }
          },
          {
            id: '2',
            blog_post_id: 'demo-2',
            author_name: 'Cosmic Wanderer',
            author_email: 'cosmic@example.com',
            content: 'I\'m new to astrology and this article was so helpful!',
            is_approved: false,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            blog_post: { title: 'Crystal Healing for Each Zodiac Sign' }
          }
        ];
        setComments(fallbackComments);
        setLoading(false);
        return;
      }

      let query = supabase
        .from('blog_comments')
        .select(`
          *,
          blog_post:blog_posts(title)
        `)
        .order('created_at', { ascending: false });

      if (filter === 'pending') {
        query = query.eq('is_approved', false);
      } else if (filter === 'approved') {
        query = query.eq('is_approved', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } else {
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveComment = async (commentId: string) => {
    try {
      if (!supabase) {
        // Simulate approval for demo
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, is_approved: true }
            : comment
        ));
        alert('Comment approved! ✨');
        return;
      }

      const { error } = await supabase
        .from('blog_comments')
        .update({ is_approved: true })
        .eq('id', commentId);

      if (error) {
        console.error('Error approving comment:', error);
        alert('Error approving comment. Please try again.');
      } else {
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, is_approved: true }
            : comment
        ));
        alert('Comment approved! ✨');
      }
    } catch (error) {
      console.error('Error approving comment:', error);
      alert('Error approving comment. Please try again.');
    }
  };

  const handleRejectComment = async (commentId: string) => {
    try {
      if (!supabase) {
        // Simulate rejection for demo
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        alert('Comment rejected and removed! 🗑️');
        return;
      }

      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', commentId);

      if (error) {
        console.error('Error rejecting comment:', error);
        alert('Error rejecting comment. Please try again.');
      } else {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        alert('Comment rejected and removed! 🗑️');
      }
    } catch (error) {
      console.error('Error rejecting comment:', error);
      alert('Error rejecting comment. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredComments = comments.filter(comment => {
    if (filter === 'pending') return !comment.is_approved;
    if (filter === 'approved') return comment.is_approved;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🌙</div>
            <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-2">
              Loading comments...
            </h3>
            <p className="text-[#C0C0C0]">
              Connecting to the mystical realms
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-2">
                💬 Comments Management
              </h1>
              <p className="text-[#C0C0C0]">
                Moderate and manage community comments
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="bg-[#FFD700] text-[#191970] px-4 py-2 rounded-lg font-semibold hover:bg-[#FFED4E] transition-colors"
            >
              ← Back to Blog Admin
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-[#FFD700] text-[#191970]'
                  : 'bg-[#232946] text-[#C0C0C0] hover:bg-[#191970]'
              }`}
            >
              All ({comments.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-[#FFD700] text-[#191970]'
                  : 'bg-[#232946] text-[#C0C0C0] hover:bg-[#191970]'
              }`}
            >
              Pending ({comments.filter(c => !c.is_approved).length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'approved'
                  ? 'bg-[#FFD700] text-[#191970]'
                  : 'bg-[#232946] text-[#C0C0C0] hover:bg-[#191970]'
              }`}
            >
              Approved ({comments.filter(c => c.is_approved).length})
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <div className="bg-[#232946] rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">🌙</div>
              <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-2">
                No comments found
              </h3>
              <p className="text-[#C0C0C0]">
                {filter === 'pending' 
                  ? 'No pending comments to review'
                  : filter === 'approved'
                  ? 'No approved comments yet'
                  : 'No comments in the system'
                }
              </p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div
                key={comment.id}
                className={`bg-[#232946] rounded-lg p-6 border-l-4 ${
                  comment.is_approved 
                    ? 'border-green-500' 
                    : 'border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-semibold text-[#FFD700]">
                        {comment.author_name}
                      </h3>
                      <span className="text-sm text-[#C0C0C0] opacity-70">
                        {comment.author_email}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        comment.is_approved
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {comment.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    {comment.blog_post && (
                      <p className="text-sm text-[#C0C0C0] mb-2">
                        On: <span className="text-[#FFD700]">{comment.blog_post.title}</span>
                      </p>
                    )}
                    <p className="text-[#C0C0C0] leading-relaxed mb-3">
                      {comment.content}
                    </p>
                    <p className="text-xs text-[#C0C0C0] opacity-60">
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    {!comment.is_approved && (
                      <button
                        onClick={() => handleApproveComment(comment.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                      >
                        ✓ Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleRejectComment(comment.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 
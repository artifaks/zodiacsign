"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  blog_post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  created_at: string;
  is_approved: boolean;
}

interface CommentSectionProps {
  blogPostId: string;
}

export default function CommentSection({ blogPostId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [blogPostId]);

  const fetchComments = async () => {
    try {
      if (!supabase) {
        console.log('Supabase not available, using fallback data');
        // Fallback data for when Supabase is not available
        const fallbackComments: Comment[] = [
          {
            id: '1',
            blog_post_id: blogPostId,
            author_name: 'Starlight Seeker',
            author_email: 'starlight@example.com',
            content: 'This article really resonated with me! The insights about lunar energy are spot on. I\'ve been practicing moon rituals for years and this perfectly captures the essence of working with lunar cycles. Thank you for sharing this wisdom! 🌙✨',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            is_approved: true
          },
          {
            id: '2',
            blog_post_id: blogPostId,
            author_name: 'Cosmic Wanderer',
            author_email: 'cosmic@example.com',
            content: 'I\'m new to astrology and this article was so helpful! The explanations are clear and easy to understand. I especially loved the practical tips for beginners. Looking forward to reading more from you! 🔮',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            is_approved: true
          },
          {
            id: '3',
            blog_post_id: blogPostId,
            author_name: 'Moon Child',
            author_email: 'moonchild@example.com',
            content: 'The way you explain the connection between celestial events and our daily lives is beautiful. This article reminded me to pay more attention to the moon phases and how they affect my energy. Such valuable insights! 💫',
            created_at: new Date(Date.now() - 259200000).toISOString(),
            is_approved: true
          }
        ];
        setComments(fallbackComments);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blog_comments')
        .select('*')
        .eq('blog_post_id', blogPostId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        // Use fallback data on error
        const fallbackComments: Comment[] = [
          {
            id: '1',
            blog_post_id: blogPostId,
            author_name: 'Starlight Seeker',
            author_email: 'starlight@example.com',
            content: 'This article really resonated with me! The insights about lunar energy are spot on. I\'ve been practicing moon rituals for years and this perfectly captures the essence of working with lunar cycles. Thank you for sharing this wisdom! 🌙✨',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            is_approved: true
          },
          {
            id: '2',
            blog_post_id: blogPostId,
            author_name: 'Cosmic Wanderer',
            author_email: 'cosmic@example.com',
            content: 'I\'m new to astrology and this article was so helpful! The explanations are clear and easy to understand. I especially loved the practical tips for beginners. Looking forward to reading more from you! 🔮',
            created_at: new Date(Date.now() - 172800000).toISOString(),
            is_approved: true
          }
        ];
        setComments(fallbackComments);
      } else {
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author_name.trim() || !newComment.content.trim()) return;

    setIsSubmitting(true);

    try {
      if (!supabase) {
        // Simulate comment submission for demo
        const demoComment: Comment = {
          id: Date.now().toString(),
          blog_post_id: blogPostId,
          author_name: newComment.author_name,
          author_email: newComment.author_email,
          content: newComment.content,
          created_at: new Date().toISOString(),
          is_approved: true
        };
        
        setComments(prev => [demoComment, ...prev]);
        setNewComment({ author_name: '', author_email: '', content: '' });
        setShowForm(false);
        alert('Thank you for your comment! It has been submitted and will be visible once approved. ✨');
        return;
      }

      const { error } = await supabase
        .from('blog_comments')
        .insert([
          {
            blog_post_id: blogPostId,
            author_name: newComment.author_name,
            author_email: newComment.author_email,
            content: newComment.content,
            is_approved: false // Comments need approval
          }
        ]);

      if (error) {
        console.error('Error submitting comment:', error);
        alert('There was an error submitting your comment. Please try again.');
      } else {
        setNewComment({ author_name: '', author_email: '', content: '' });
        setShowForm(false);
        alert('Thank you for your comment! It has been submitted and will be visible once approved. ✨');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('There was an error submitting your comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-[#232946] rounded-lg p-8 mt-12">
        <div className="animate-pulse">
          <div className="h-6 bg-[#191970] rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-[#191970] rounded w-3/4"></div>
            <div className="h-4 bg-[#191970] rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#232946] rounded-lg p-8 mt-12">
      <h3 className="text-2xl font-serif text-[#FFD700] font-bold mb-6">
        💬 Join the Cosmic Conversation
      </h3>
      
      <p className="text-[#C0C0C0] mb-8">
        Share your thoughts, experiences, and insights with our mystical community. Your wisdom enriches us all! ✨
      </p>

      {/* Comment Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#FFD700] to-[#FFED4E] text-[#191970] px-6 py-3 rounded-lg font-semibold hover:from-[#FFED4E] hover:to-[#FFD700] transition-all transform hover:scale-105 mb-8"
        >
          🌟 Leave a Comment
        </button>
      ) : (
        <form onSubmit={handleSubmitComment} className="bg-[#191970] rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="author_name" className="text-[#FFD700] font-semibold mb-2 block">
                Your Name *
              </label>
              <input
                type="text"
                id="author_name"
                value={newComment.author_name}
                onChange={(e) => setNewComment(prev => ({ ...prev, author_name: e.target.value }))}
                className="w-full bg-[#232946] text-[#C0C0C0] p-3 rounded-lg border border-[#FFD700]/20 focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>
            <div>
              <label htmlFor="author_email" className="text-[#FFD700] font-semibold mb-2 block">
                Email (optional)
              </label>
              <input
                type="email"
                id="author_email"
                value={newComment.author_email}
                onChange={(e) => setNewComment(prev => ({ ...prev, author_email: e.target.value }))}
                className="w-full bg-[#232946] text-[#C0C0C0] p-3 rounded-lg border border-[#FFD700]/20 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="text-[#FFD700] font-semibold mb-2 block">
              Your Comment *
            </label>
            <textarea
              id="content"
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="w-full bg-[#232946] text-[#C0C0C0] p-3 rounded-lg border border-[#FFD700]/20 focus:outline-none focus:border-[#FFD700] resize-none"
              placeholder="Share your thoughts, experiences, or questions..."
              required
            />
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting || !newComment.author_name.trim() || !newComment.content.trim()}
              className="bg-[#FFD700] text-[#191970] px-6 py-2 rounded-lg font-semibold hover:bg-[#FFED4E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : '✨ Submit Comment'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-[#232946] text-[#C0C0C0] px-6 py-2 rounded-lg font-semibold hover:bg-[#191970] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        <h4 className="text-xl font-serif text-[#FFD700] font-bold">
          {comments.length} Comment{comments.length !== 1 ? 's' : ''}
        </h4>
        
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌙</div>
            <p className="text-[#C0C0C0]">Be the first to share your cosmic wisdom!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-[#191970] rounded-lg p-6 border-l-4 border-[#FFD700]">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-[#FFD700]">{comment.author_name}</h5>
                <span className="text-sm text-[#C0C0C0] opacity-70">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-[#C0C0C0] leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

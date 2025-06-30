"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import CommentSection from '@/components/CommentSection';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: 'moon-phases' | 'astrology' | 'rituals' | 'crystals' | 'meditation';
  read_time: string;
  image: string;
  image_url?: string;
  tags: string[];
}

const categories = [
  { id: 'moon-phases', name: 'Moon Phases', icon: '🌙' },
  { id: 'astrology', name: 'Astrology', icon: '⭐' },
  { id: 'rituals', name: 'Rituals', icon: '🕯️' },
  { id: 'crystals', name: 'Crystals', icon: '💎' },
  { id: 'meditation', name: 'Meditation', icon: '🧘' }
];

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/blog-posts/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }

        const data = await response.json();
        setPost(data.post);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Post not found or error loading content');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Check out this cosmic wisdom!';
    const text = post?.excerpt || 'Discover mystical insights and spiritual practices.';
    
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
        const imageUrl = post?.image_url ? `${window.location.origin}${post.image_url}` : '';
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}&media=${encodeURIComponent(imageUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\nRead more: ${url}`)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          alert('Link copied to clipboard! ✨');
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4 animate-pulse">🌙</div>
          <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-2">
            Loading cosmic wisdom...
          </h3>
          <p className="text-[#C0C0C0]">
            Connecting to the mystical realms
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
            Article Not Found
          </h1>
          <p className="text-[#C0C0C0] mb-6">
            The cosmic wisdom you're seeking has wandered into another dimension
          </p>
          <Link
            href="/blog"
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            Return to Blog ✨
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors duration-300"
          >
            <span>←</span>
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20 mb-8">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg text-[#FFD700]">
              {categories.find(cat => cat.id === post.category)?.icon}
            </span>
            <span className="text-sm text-[#C0C0C0] uppercase tracking-wide">
              {categories.find(cat => cat.id === post.category)?.name}
            </span>
          </div>

          {/* Article Image */}
          <div className="mb-6 text-center">
            {post.image_url ? (
              <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to emoji if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="text-8xl flex items-center justify-center w-full h-full bg-gradient-to-br from-[#232946] to-[#0a0a23]"
                  style={{ display: 'none' }}
                >
                  {post.image}
                </div>
              </div>
            ) : (
              <div className="text-8xl">
                {post.image}
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-4xl font-serif text-[#FFD700] font-bold mb-4 text-center">
            {post.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-[#C0C0C0]/60 mb-6">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <span>👤 {post.author}</span>
              <span>📅 {formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⏱️ {post.read_time}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#191970]/40 text-[#FFD700] px-3 py-1 rounded-full border border-[#FFD700]/20"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Article Excerpt */}
          <div className="bg-[#1b1b3a]/40 rounded-lg p-4 mb-6 border border-[#FFD700]/10">
            <p className="text-[#C0C0C0] text-lg italic">
              {post.excerpt}
            </p>
          </div>
        </article>

        {/* Article Content */}
        <div className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-[#C0C0C0] leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .split('\n\n')
                  .map(paragraph => `<p class="mb-6">${paragraph}</p>`)
                  .join('')
              }}
            />
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-8 p-6 bg-gradient-to-br from-[#1b1b3a] to-[#0a0a23] rounded-xl border border-[#FFD700]/20">
          <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-4 text-center">
            🌟 Share This Cosmic Wisdom
          </h3>
          <p className="text-[#C0C0C0] text-center mb-6">
            Help others discover this mystical insight by sharing it with your community
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <button 
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">🐦</span>
              <span className="hidden sm:inline">Twitter</span>
            </button>
            
            <button 
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center gap-2 bg-[#4267B2] hover:bg-[#4267B2]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">📘</span>
              <span className="hidden sm:inline">Facebook</span>
            </button>
            
            <button 
              onClick={() => handleShare('linkedin')}
              className="flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#0077B5]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">💼</span>
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
            
            <button 
              onClick={() => handleShare('pinterest')}
              className="flex items-center justify-center gap-2 bg-[#E60023] hover:bg-[#E60023]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">📌</span>
              <span className="hidden sm:inline">Pinterest</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => handleShare('whatsapp')}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">💬</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            
            <button 
              onClick={() => handleShare('telegram')}
              className="flex items-center justify-center gap-2 bg-[#0088CC] hover:bg-[#0088CC]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">📡</span>
              <span className="hidden sm:inline">Telegram</span>
            </button>
            
            <button 
              onClick={() => handleShare('email')}
              className="flex items-center justify-center gap-2 bg-[#EA4335] hover:bg-[#EA4335]/80 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">📧</span>
              <span className="hidden sm:inline">Email</span>
            </button>
            
            <button 
              onClick={() => handleShare('copy')}
              className="flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FFA500] text-black px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-lg">📋</span>
              <span className="hidden sm:inline">Copy Link</span>
            </button>
          </div>
        </div>

        {/* Comment Section */}
        <CommentSection blogPostId={post.id} />

        {/* Related Articles Suggestion */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-8 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            Explore More Cosmic Wisdom ✨
          </Link>
        </div>
      </div>
    </div>
  );
} 
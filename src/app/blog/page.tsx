"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

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

// Fallback static data for when Supabase is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Power of the Full Moon: Harnessing Lunar Energy',
    excerpt: 'Discover how to align with the full moon\'s energy for manifestation, release, and spiritual growth.',
    content: 'The full moon is a time of culmination and illumination. When the moon is at its brightest, it illuminates not just the night sky, but also our inner world...',
    author: 'Luna Starlight',
    published_at: '2025-06-25',
    category: 'moon-phases',
    read_time: '5 min read',
    image: '🌕',
    image_url: '/images/full-moon.svg',
    tags: ['full moon', 'manifestation', 'lunar energy', 'spirituality']
  },
  {
    id: '2',
    title: 'Crystal Healing for Each Zodiac Sign',
    excerpt: 'Find the perfect crystals to enhance your natural zodiac energy and support your spiritual journey.',
    content: 'Each zodiac sign has unique energetic qualities that can be amplified and balanced through specific crystals...',
    author: 'Crystal Moon',
    published_at: '2025-06-23',
    category: 'crystals',
    read_time: '7 min read',
    image: '💎',
    image_url: '/images/crystals.svg',
    tags: ['crystals', 'zodiac', 'healing', 'energy work']
  },
  {
    id: '3',
    title: 'New Moon Rituals for Fresh Beginnings',
    excerpt: 'Learn powerful rituals to set intentions and plant seeds for your dreams during the new moon phase.',
    content: 'The new moon represents new beginnings, fresh starts, and the perfect time to plant seeds for your future...',
    author: 'Sage Wisdom',
    published_at: '2025-06-20',
    category: 'rituals',
    read_time: '6 min read',
    image: '🌑',
    image_url: '/images/new-moon.svg',
    tags: ['new moon', 'rituals', 'intentions', 'beginnings']
  },
  {
    id: '4',
    title: 'Mercury Retrograde Survival Guide',
    excerpt: 'Navigate communication challenges and technological hiccups with grace during Mercury retrograde.',
    content: 'Mercury retrograde periods can bring communication breakdowns, travel delays, and technological issues...',
    author: 'Cosmic Guide',
    published_at: '2025-06-18',
    category: 'astrology',
    read_time: '8 min read',
    image: '☿',
    image_url: '/images/mercury-retrograde.svg',
    tags: ['mercury retrograde', 'communication', 'astrology', 'survival guide']
  },
  {
    id: '5',
    title: 'Meditation Techniques for Inner Peace',
    excerpt: 'Explore ancient and modern meditation practices to cultivate inner peace and spiritual connection.',
    content: 'Meditation is a powerful tool for connecting with your higher self and finding inner peace...',
    author: 'Zen Master',
    published_at: '2025-06-15',
    category: 'meditation',
    read_time: '10 min read',
    image: '🧘‍♀️',
    image_url: '/images/meditation.svg',
    tags: ['meditation', 'inner peace', 'mindfulness', 'spiritual practice']
  },
  {
    id: '6',
    title: 'The Magic of Moon Water: How to Make and Use It',
    excerpt: 'Learn the ancient practice of charging water with lunar energy for healing and manifestation.',
    content: 'Moon water is water that has been charged with the energy of the moon, creating a powerful tool for...',
    author: 'Moon Child',
    published_at: '2025-06-12',
    category: 'rituals',
    read_time: '6 min read',
    image: '🌊',
    image_url: 'https://example.com/moon-water.jpg',
    tags: ['moon water', 'charging', 'healing', 'manifestation']
  }
];

const categories = [
  { id: 'all', name: 'All Posts', icon: '📚' },
  { id: 'moon-phases', name: 'Moon Phases', icon: '🌙' },
  { id: 'astrology', name: 'Astrology', icon: '⭐' },
  { id: 'rituals', name: 'Rituals', icon: '🕯️' },
  { id: 'crystals', name: 'Crystals', icon: '💎' },
  { id: 'meditation', name: 'Meditation', icon: '🧘' }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch blog posts from Supabase
  const fetchBlogPosts = async (category?: string, search?: string) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (category && category !== 'all') {
        params.append('category', category);
      }
      if (search) {
        params.append('search', search);
      }

      const response = await fetch(`/api/blog-posts?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      
      if (data.posts && data.posts.length > 0) {
        setBlogPosts(data.posts);
        setUsingFallback(false);
      } else {
        // Use fallback data if no posts from Supabase
        setBlogPosts(fallbackBlogPosts);
        setUsingFallback(true);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      // Use fallback data on error
      setBlogPosts(fallbackBlogPosts);
      setUsingFallback(true);
      setError('Using sample data while connecting to the cosmic database...');
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Fetch posts when category or search changes
  useEffect(() => {
    if (!usingFallback) {
      fetchBlogPosts(selectedCategory, searchQuery);
    }
  }, [selectedCategory, searchQuery, usingFallback]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h1 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-[#C0C0C0] mb-6">{error}</p>
          <button
            onClick={() => fetchBlogPosts()}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
          >
            Try Again ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#191970] via-[#232946] to-[#0a0a23] pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] font-bold mb-4 drop-shadow-lg">
            🌟 Cosmic Wisdom Blog
          </h1>
          <p className="text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto">
            Explore mystical insights, lunar wisdom, and spiritual practices to enhance your cosmic journey
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:border-[#FFD700]/60 focus:ring-2 focus:ring-[#FFD700]/20"
              />
              <span className="absolute right-3 top-3 text-[#FFD700]">🔍</span>
            </div>
          </div>

          {/* Fallback Notice */}
          {usingFallback && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
              <p className="text-sm text-[#FFD700]">
                ✨ Using sample data. Connect Supabase for live content!
              </p>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#FFD700] text-black font-semibold'
                  : 'bg-[#232946]/60 text-[#C0C0C0] hover:bg-[#232946]/80 hover:text-[#FFD700] border border-[#FFD700]/20'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pulse">🌙</div>
            <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-2">
              Loading cosmic wisdom...
            </h3>
            <p className="text-[#C0C0C0]">
              Connecting to the mystical realms
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gradient-to-br from-[#232946] to-[#0a0a23] rounded-2xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300 group hover:shadow-lg hover:shadow-[#FFD700]/10"
              >
                {/* Post Image */}
                <div className="mb-4 text-center">
                  {post.image_url ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
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
                            fallback.style.display = 'block';
                          }
                        }}
                      />
                      <div 
                        className="text-6xl flex items-center justify-center w-full h-full bg-gradient-to-br from-[#232946] to-[#0a0a23]"
                        style={{ display: 'none' }}
                      >
                        {post.image}
                      </div>
                    </div>
                  ) : (
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {post.image}
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-[#FFD700] font-semibold">
                    {categories.find(cat => cat.id === post.category)?.icon}
                  </span>
                  <span className="text-xs text-[#C0C0C0] uppercase tracking-wide">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>

                {/* Post Title */}
                <Link href={`/blog/${post.id}`}>
                  <h2 className="text-xl font-serif text-[#FFD700] font-bold mb-3 group-hover:text-white transition-colors duration-300 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                {/* Post Excerpt */}
                <p className="text-[#C0C0C0] text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[#191970]/40 text-[#FFD700] px-2 py-1 rounded-full border border-[#FFD700]/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-xs text-[#C0C0C0]/60">
                  <div className="flex items-center gap-2">
                    <span>👤 {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅 {formatDate(post.published_at)}</span>
                    <span>⏱️ {post.read_time}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="w-full mt-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold py-2 px-4 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300 transform hover:scale-105 block text-center"
                >
                  Read Full Article ✨
                </Link>
                
                {/* Quick Share Button */}
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/blog/${post.id}`;
                    const text = `${post.title} - Check out this cosmic wisdom!`;
                    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                  }}
                  className="w-full mt-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>🐦</span>
                  <span>Share on Twitter</span>
                </button>
              </article>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔮</div>
            <h3 className="text-xl font-serif text-[#FFD700] font-bold mb-2">
              No articles found
            </h3>
            <p className="text-[#C0C0C0]">
              Try adjusting your search or category filter
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-br from-[#1b1b3a] to-[#0a0a23] rounded-2xl p-8 border border-[#FFD700]/20">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-[#FFD700] font-bold mb-4">
              🌙 Stay Connected to the Cosmos
            </h2>
            <p className="text-[#C0C0C0] mb-6 max-w-md mx-auto">
              Get weekly cosmic insights, moon phase updates, and exclusive spiritual content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-[#232946]/60 border border-[#FFD700]/30 rounded-lg text-[#C0C0C0] placeholder-[#C0C0C0]/60 focus:outline-none focus:border-[#FFD700]/60"
              />
              <button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-semibold px-6 py-3 rounded-lg hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300">
                Subscribe ✨
              </button>
            </div>
            <p className="text-xs text-[#C0C0C0]/60 mt-3">
              Join 2,847 cosmic souls already receiving our wisdom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
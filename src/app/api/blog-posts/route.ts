import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Fallback static data for when Supabase is not available
const fallbackBlogPosts = [
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
  }
];

export async function GET(request: NextRequest) {
  try {
    // If Supabase is not available, return fallback data
    if (!supabase) {
      console.log('Supabase not available, returning fallback data');
      return NextResponse.json({
        posts: fallbackBlogPosts,
        total: fallbackBlogPosts.length,
        hasMore: false
      });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    // Filter by category if provided
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Search functionality
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // Add pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      // If table doesn't exist or other Supabase error, return fallback data
      return NextResponse.json({
        posts: fallbackBlogPosts,
        total: fallbackBlogPosts.length,
        hasMore: false
      });
    }

    return NextResponse.json({
      posts: data || [],
      total: count || 0,
      hasMore: (data?.length || 0) === limit
    });

  } catch (error) {
    console.error('API error:', error);
    // Return fallback data on any error
    return NextResponse.json({
      posts: fallbackBlogPosts,
      total: fallbackBlogPosts.length,
      hasMore: false
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client not available' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { title, excerpt, content, author, category, readTime, image, tags, published } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !author || !category || !readTime || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['moon-phases', 'astrology', 'rituals', 'crystals', 'meditation'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const postData = {
      title,
      excerpt,
      content,
      author,
      category,
      read_time: readTime,
      image,
      tags: tags || [],
      published: published || false,
      published_at: published ? new Date().toISOString() : null
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create blog post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
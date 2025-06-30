import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Fallback static data for when Supabase is not available
const fallbackBlogPosts = [
  {
    id: '1',
    title: 'The Power of the Full Moon: Harnessing Lunar Energy',
    excerpt: 'Discover how to align with the full moon\'s energy for manifestation, release, and spiritual growth.',
    content: `The full moon is a time of culmination and illumination. When the moon is at its brightest, it illuminates not just the night sky, but also our inner world. This powerful lunar phase represents completion, fulfillment, and the perfect time for manifestation and release.

During the full moon, the moon's energy is at its peak, making it an ideal time for:

**Manifestation Practices:**
- Writing down your goals and desires
- Creating vision boards
- Performing abundance rituals
- Setting powerful intentions

**Release Work:**
- Letting go of what no longer serves you
- Burning or burying written releases
- Cleansing rituals and ceremonies
- Emotional healing and forgiveness

**Energy Amplification:**
- Charging crystals and sacred objects
- Creating moon water for spiritual use
- Performing divination and psychic work
- Connecting with lunar deities and spirits

The full moon's energy can be intense, so it's important to ground yourself and practice self-care during this time. Listen to your intuition and honor your emotional needs.`,
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
    content: `Each zodiac sign has unique energetic qualities that can be amplified and balanced through specific crystals. Understanding which crystals resonate with your sign can enhance your spiritual practice and support your personal growth.

Here's a guide to the best crystals for each zodiac sign:

Aries (March 21 - April 19): Carnelian, Bloodstone, Red Jasper
These fiery stones enhance Aries' natural courage, leadership, and pioneering spirit.

Taurus (April 20 - May 20): Rose Quartz, Green Aventurine, Emerald
These grounding stones support Taurus' love of beauty, stability, and sensual pleasures.

Gemini (May 21 - June 20): Citrine, Tiger's Eye, Agate
These communicative stones enhance Gemini's natural curiosity, adaptability, and intellectual pursuits.

Cancer (June 21 - July 22): Moonstone, Pearl, Selenite
These lunar stones resonate with Cancer's emotional depth, intuition, and nurturing qualities.

Leo (July 23 - August 22): Sunstone, Amber, Yellow Sapphire
These radiant stones amplify Leo's natural charisma, creativity, and leadership abilities.

Virgo (August 23 - September 22): Amazonite, Moss Agate, Peridot
These practical stones support Virgo's attention to detail, healing abilities, and service-oriented nature.`,
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
    content: `The new moon represents new beginnings, fresh starts, and the perfect time to plant seeds for your future. This dark phase of the lunar cycle is when the moon is invisible in the sky, symbolizing the void from which all creation emerges.

New moon rituals are powerful tools for manifestation and intention-setting. Here are some effective practices:

1. **Intention Setting Ceremony**
   - Create a sacred space with candles, crystals, and incense
   - Write down your intentions on paper
   - Read them aloud with conviction
   - Burn the paper to release your intentions to the universe

2. **Vision Board Creation**
   - Gather images, words, and symbols that represent your goals
   - Arrange them on a board or in a journal
   - Place it where you'll see it daily
   - Visualize your dreams coming true

3. **Crystal Grid Ritual**
   - Choose crystals that align with your intentions
   - Arrange them in a sacred geometric pattern
   - Meditate with the grid for 10-15 minutes
   - Leave it in place for the entire lunar cycle

4. **Moon Water Creation**
   - Place a glass jar of water under the new moon
   - Add crystals or herbs that support your intentions
   - Leave it overnight to charge
   - Use the water for drinking, bathing, or anointing

Remember, the new moon is about planting seeds, not harvesting. Be patient and trust that your intentions will manifest in divine timing.`,
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
    content: `Mercury retrograde periods can bring communication breakdowns, travel delays, and technological issues. This astrological phenomenon occurs when Mercury appears to move backward in the sky, affecting communication, technology, and travel.

While Mercury retrograde often gets a bad reputation, it's actually a powerful time for reflection, review, and revision. Here's how to navigate it gracefully:

**What to Avoid:**
- Signing important contracts or making major decisions
- Starting new projects or relationships
- Making large purchases, especially technology
- Traveling without backup plans
- Sending important emails without double-checking

**What to Embrace:**
- Reviewing and revising existing projects
- Reconnecting with old friends or colleagues
- Completing unfinished tasks
- Deep reflection and meditation
- Organizing and decluttering your space

**Survival Tips:**
1. **Backup Everything**: Save important files and documents
2. **Communicate Clearly**: Double-check messages and confirmations
3. **Practice Patience**: Expect delays and misunderstandings
4. **Use Retrograde Energy**: Focus on review and revision
5. **Stay Grounded**: Maintain your daily routines and self-care practices

Remember, Mercury retrograde isn't inherently bad—it's an opportunity to slow down, reflect, and refine what's already in your life.`,
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
    content: `Meditation is a powerful tool for connecting with your higher self and finding inner peace. In our fast-paced world, taking time to quiet the mind and connect with our inner wisdom is more important than ever.

Here are several meditation techniques you can practice:

**1. Breath Awareness Meditation**
- Sit comfortably with your eyes closed
- Focus your attention on your natural breath
- When your mind wanders, gently return to your breath
- Start with 5-10 minutes and gradually increase

**2. Loving-Kindness Meditation**
- Begin by directing love and compassion toward yourself
- Gradually extend this love to loved ones, acquaintances, and all beings
- Repeat phrases like "May you be happy, may you be healthy, may you be at peace"

**3. Body Scan Meditation**
- Lie down comfortably and close your eyes
- Bring attention to each part of your body, starting from your toes
- Notice sensations, tension, or relaxation in each area
- Release any tension you find

**4. Walking Meditation**
- Walk slowly and mindfully, paying attention to each step
- Feel the ground beneath your feet
- Notice the movement of your body and your surroundings
- Stay present in the moment

**5. Mantra Meditation**
- Choose a sacred word or phrase
- Repeat it silently or aloud
- Let the sound and vibration fill your awareness
- Allow it to carry you deeper into meditation

Regular meditation practice can reduce stress, improve focus, increase self-awareness, and cultivate a sense of inner peace that extends into all areas of your life.`,
    author: 'Zen Master',
    published_at: '2025-06-15',
    category: 'meditation',
    read_time: '10 min read',
    image: '🧘‍♀️',
    image_url: '/images/meditation.svg',
    tags: ['meditation', 'inner peace', 'mindfulness', 'spiritual practice']
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Try to fetch from Supabase first
    if (supabase) {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        // Fall back to static data
      } else if (post) {
        return NextResponse.json({ post });
      }
    }

    // Fallback to static data
    const fallbackPost = fallbackBlogPosts.find(post => post.id === id);
    
    if (fallbackPost) {
      return NextResponse.json({ post: fallbackPost });
    }

    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error fetching blog post:', error);
    
    // Try fallback data as last resort
    const { id } = await params;
    const fallbackPost = fallbackBlogPosts.find(post => post.id === id);
    
    if (fallbackPost) {
      return NextResponse.json({ post: fallbackPost });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
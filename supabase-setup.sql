-- Celestial Calendar Database Setup
-- Run these commands in your Supabase SQL Editor
-- This version handles existing tables gracefully

-- Create birth_charts table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS birth_charts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place TEXT NOT NULL,
  sun_sign TEXT NOT NULL,
  moon_sign TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journal_entries table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  response TEXT,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('moon-phases', 'astrology', 'rituals', 'crystals', 'meditation')),
  read_time VARCHAR(20) NOT NULL,
  image VARCHAR(10) NOT NULL,
  image_url VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_comments table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ebook_purchases table for tracking sales
CREATE TABLE IF NOT EXISTS ebook_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  customer_email TEXT,
  amount INTEGER NOT NULL, -- Amount in cents
  status TEXT NOT NULL DEFAULT 'pending',
  download_count INTEGER DEFAULT 0,
  download_limit INTEGER DEFAULT 3, -- Allow 3 downloads per purchase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Horoscope Subscriptions Table
CREATE TABLE IF NOT EXISTS horoscope_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  zodiac_sign TEXT NOT NULL CHECK (zodiac_sign IN ('Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (ignore if already enabled)
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebook_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE horoscope_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own birth chart" ON birth_charts;
DROP POLICY IF EXISTS "Users can insert own birth chart" ON birth_charts;
DROP POLICY IF EXISTS "Users can update own birth chart" ON birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth chart" ON birth_charts;

DROP POLICY IF EXISTS "Users can view own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can insert own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can update own journal entries" ON journal_entries;
DROP POLICY IF EXISTS "Users can delete own journal entries" ON journal_entries;

DROP POLICY IF EXISTS "Anyone can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can view all blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON blog_posts;

DROP POLICY IF EXISTS "Users can view their own purchases" ON ebook_purchases;
DROP POLICY IF EXISTS "Service can insert purchases" ON ebook_purchases;
DROP POLICY IF EXISTS "Service can update purchases" ON ebook_purchases;

DROP POLICY IF EXISTS "Users can view own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can delete own subscriptions" ON horoscope_subscriptions;

-- Create policies for birth_charts
CREATE POLICY "Users can view own birth chart" ON birth_charts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own birth chart" ON birth_charts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own birth chart" ON birth_charts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own birth chart" ON birth_charts
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for journal_entries
CREATE POLICY "Users can view own journal entries" ON journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON journal_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for blog_posts
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Blog posts are insertable by authenticated users" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Blog posts are updatable by authenticated users" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Blog posts are deletable by authenticated users" ON blog_posts
  FOR DELETE USING (true);

-- Enable RLS on blog_comments
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_comments
CREATE POLICY "Blog comments are viewable by everyone" ON blog_comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Blog comments are insertable by everyone" ON blog_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Blog comments are updatable by authenticated users" ON blog_comments
  FOR UPDATE USING (true);

CREATE POLICY "Blog comments are deletable by authenticated users" ON blog_comments
  FOR DELETE USING (true);

-- Create policies for ebook_purchases
CREATE POLICY "Users can view their own purchases" ON ebook_purchases
  FOR SELECT USING (auth.email() = customer_email);

CREATE POLICY "Service can insert purchases" ON ebook_purchases
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service can update purchases" ON ebook_purchases
  FOR UPDATE USING (true);

-- Create policies for horoscope_subscriptions
CREATE POLICY "Users can view own subscriptions" ON horoscope_subscriptions
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Users can insert own subscriptions" ON horoscope_subscriptions
  FOR INSERT WITH CHECK (auth.email() = email);

CREATE POLICY "Users can update own subscriptions" ON horoscope_subscriptions
  FOR UPDATE USING (auth.email() = email);

CREATE POLICY "Users can delete own subscriptions" ON horoscope_subscriptions
  FOR DELETE USING (auth.email() = email);

-- Create indexes for better performance (ignore if they exist)
CREATE INDEX IF NOT EXISTS idx_birth_charts_user_id ON birth_charts(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_post_id ON blog_comments(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_is_approved ON blog_comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ebook_purchases_session_id ON ebook_purchases(session_id);
CREATE INDEX IF NOT EXISTS idx_ebook_purchases_customer_email ON ebook_purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_horoscope_subscriptions_email ON horoscope_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_horoscope_subscriptions_active ON horoscope_subscriptions(is_active) WHERE is_active = true;

-- Clear existing blog posts to avoid duplicates
DELETE FROM blog_posts;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, author, category, read_time, image, image_url, tags, published, published_at) VALUES
(
  'The Power of the Full Moon: Harnessing Lunar Energy',
  'Discover how to align with the full moon''s energy for manifestation, release, and spiritual growth.',
  'The full moon is a time of culmination and illumination. When the moon is at its brightest, it illuminates not just the night sky, but also our inner world. This powerful phase represents the peak of lunar energy, making it an ideal time for manifestation, release, and spiritual practices.

During the full moon, our emotions and intuition are heightened, allowing us to connect more deeply with our subconscious mind. This is the perfect time to:

• Set powerful intentions for what you want to manifest
• Release old patterns, beliefs, or relationships that no longer serve you
• Practice gratitude and celebrate your achievements
• Connect with your spiritual guides and higher self
• Perform rituals for abundance, love, and healing

The full moon''s energy amplifies our thoughts and emotions, so it''s crucial to maintain positive energy and clear intentions during this time. Whether you''re new to lunar practices or a seasoned practitioner, the full moon offers a potent opportunity for transformation and growth.',
  'Luna Starlight',
  'moon-phases',
  '5 min read',
  '🌕',
  '/images/full-moon.svg',
  ARRAY['full moon', 'manifestation', 'lunar energy', 'spirituality'],
  true,
  NOW() - INTERVAL '1 day'
),
(
  'Crystal Healing for Each Zodiac Sign',
  'Find the perfect crystals to enhance your natural zodiac energy and support your spiritual journey.',
  'Each zodiac sign has unique energetic qualities that can be amplified and balanced through specific crystals. Understanding the connection between your astrological sign and crystal properties can enhance your spiritual practice and support your personal growth.

Aries (March 21 - April 19): Carnelian, Red Jasper, Bloodstone
These fiery stones enhance courage, leadership, and physical energy, perfect for Aries'' bold and dynamic nature.

Taurus (April 20 - May 20): Rose Quartz, Green Aventurine, Emerald
These grounding stones support Taurus'' love of beauty, stability, and connection to the earth.

Gemini (May 21 - June 20): Citrine, Tiger''s Eye, Agate
These communicative stones enhance Gemini''s natural curiosity, adaptability, and intellectual pursuits.

Cancer (June 21 - July 22): Moonstone, Pearl, Selenite
These lunar stones resonate with Cancer''s emotional depth, intuition, and nurturing qualities.

Leo (July 23 - August 22): Sunstone, Amber, Yellow Sapphire
These radiant stones amplify Leo''s natural charisma, creativity, and leadership abilities.

Virgo (August 23 - September 22): Amazonite, Moss Agate, Peridot
These practical stones support Virgo''s attention to detail, healing abilities, and service-oriented nature.',
  'Crystal Moon',
  'crystals',
  '7 min read',
  '💎',
  '/images/crystals.svg',
  ARRAY['crystals', 'zodiac', 'healing', 'energy work'],
  true,
  NOW() - INTERVAL '3 days'
),
(
  'New Moon Rituals for Fresh Beginnings',
  'Learn powerful rituals to set intentions and plant seeds for your dreams during the new moon phase.',
  'The new moon represents new beginnings, fresh starts, and the perfect time to plant seeds for your future. This dark phase of the lunar cycle is when the moon is invisible in the sky, symbolizing the void from which all creation emerges.

New moon rituals are powerful tools for manifestation and intention-setting. Here are some effective practices:

1. **Intention Setting Ceremony**
   - Create a sacred space with candles, crystals, and incense
   - Write down your intentions on paper
   - Read them aloud with conviction
   - Burn the paper to release your intentions to the universe

2. **Vision Board Creation**
   - Gather images, words, and symbols that represent your goals
   - Arrange them on a board or in a journal
   - Place it where you''ll see it daily
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

Remember, the new moon is about planting seeds, not harvesting. Be patient and trust that your intentions will manifest in divine timing.',
  'Sage Wisdom',
  'rituals',
  '6 min read',
  '🌑',
  '/images/new-moon.svg',
  ARRAY['new moon', 'rituals', 'intentions', 'beginnings'],
  true,
  NOW() - INTERVAL '5 days'
),
(
  'Mercury Retrograde Survival Guide',
  'Navigate communication challenges and technological hiccups with grace during Mercury retrograde.',
  'Mercury retrograde periods can bring communication breakdowns, travel delays, and technological issues. This astrological phenomenon occurs when Mercury appears to move backward in the sky, affecting communication, technology, and travel.

While Mercury retrograde often gets a bad reputation, it''s actually a powerful time for reflection, review, and revision. Here''s how to navigate it gracefully:

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

Remember, Mercury retrograde isn''t inherently bad—it''s an opportunity to slow down, reflect, and refine what''s already in your life.',
  'Cosmic Guide',
  'astrology',
  '8 min read',
  '☿',
  '/images/mercury-retrograde.svg',
  ARRAY['mercury retrograde', 'communication', 'astrology', 'survival guide'],
  true,
  NOW() - INTERVAL '7 days'
),
(
  'Meditation Techniques for Inner Peace',
  'Explore ancient and modern meditation practices to cultivate inner peace and spiritual connection.',
  'Meditation is a powerful tool for connecting with your higher self and finding inner peace. In our fast-paced world, taking time to quiet the mind and connect with our inner wisdom is more important than ever.

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

Regular meditation practice can reduce stress, improve focus, increase self-awareness, and cultivate a sense of inner peace that extends into all areas of your life.',
  'Zen Master',
  'meditation',
  '10 min read',
  '🧘‍♀️',
  '/images/meditation.svg',
  ARRAY['meditation', 'inner peace', 'mindfulness', 'spiritual practice'],
  true,
  NOW() - INTERVAL '10 days'
);

-- Clear existing blog comments to avoid duplicates
DELETE FROM blog_comments;

-- Insert sample comments (these will be linked to the first blog post)
INSERT INTO blog_comments (blog_post_id, author_name, author_email, content, is_approved, created_at) 
SELECT 
  bp.id,
  'Starlight Seeker',
  'starlight@example.com',
  'This article really resonated with me! The insights about lunar energy are spot on. I''ve been practicing moon rituals for years and this perfectly captures the essence of working with lunar cycles. Thank you for sharing this wisdom! 🌙✨',
  true,
  NOW() - INTERVAL '1 day'
FROM blog_posts bp 
WHERE bp.title = 'The Power of the Full Moon: Harnessing Lunar Energy'
LIMIT 1;

INSERT INTO blog_comments (blog_post_id, author_name, author_email, content, is_approved, created_at) 
SELECT 
  bp.id,
  'Cosmic Wanderer',
  'cosmic@example.com',
  'I''m new to astrology and this article was so helpful! The explanations are clear and easy to understand. I especially loved the practical tips for beginners. Looking forward to reading more from you! 🔮',
  true,
  NOW() - INTERVAL '2 days'
FROM blog_posts bp 
WHERE bp.title = 'The Power of the Full Moon: Harnessing Lunar Energy'
LIMIT 1;

INSERT INTO blog_comments (blog_post_id, author_name, author_email, content, is_approved, created_at) 
SELECT 
  bp.id,
  'Moon Child',
  'moonchild@example.com',
  'The way you explain the connection between celestial events and our daily lives is beautiful. This article reminded me to pay more attention to the moon phases and how they affect my energy. Such valuable insights! 💫',
  true,
  NOW() - INTERVAL '3 days'
FROM blog_posts bp 
WHERE bp.title = 'The Power of the Full Moon: Harnessing Lunar Energy'
LIMIT 1;

-- Insert sample subscription data
INSERT INTO horoscope_subscriptions (email, zodiac_sign, subscribed_at, is_active) VALUES
  ('luna@example.com', 'Cancer', NOW(), true),
  ('cosmic@example.com', 'Leo', NOW(), true),
  ('starry@example.com', 'Pisces', NOW(), true)
ON CONFLICT (email) DO NOTHING;

-- Success message
SELECT 'Database setup completed successfully! Blog posts and comments tables created with sample data.' as status; 
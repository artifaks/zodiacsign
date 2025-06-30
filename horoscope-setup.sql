-- Horoscope Subscriptions Table Setup
-- Run this in your Supabase SQL Editor

-- Create horoscope_subscriptions table (if it doesn't exist)
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

-- Enable Row Level Security
ALTER TABLE horoscope_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can delete own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Public subscription access" ON horoscope_subscriptions;

-- Create policies for horoscope_subscriptions
CREATE POLICY "Users can view own subscriptions" ON horoscope_subscriptions
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Users can insert own subscriptions" ON horoscope_subscriptions
  FOR INSERT WITH CHECK (auth.email() = email);

CREATE POLICY "Users can update own subscriptions" ON horoscope_subscriptions
  FOR UPDATE USING (auth.email() = email);

CREATE POLICY "Users can delete own subscriptions" ON horoscope_subscriptions
  FOR DELETE USING (auth.email() = email);

-- Allow public access for all operations (for development/testing)
CREATE POLICY "Public subscription access" ON horoscope_subscriptions
  FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_horoscope_subscriptions_email ON horoscope_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_horoscope_subscriptions_active ON horoscope_subscriptions(is_active) WHERE is_active = true;

-- Insert some sample data for testing
INSERT INTO horoscope_subscriptions (email, zodiac_sign, is_active) VALUES
  ('test@example.com', 'Aries', true),
  ('sample@example.com', 'Cancer', true)
ON CONFLICT (email) DO NOTHING;

-- Verify the table was created
SELECT 'horoscope_subscriptions table created successfully!' as status;

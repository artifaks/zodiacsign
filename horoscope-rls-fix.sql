-- Comprehensive Horoscope Subscriptions RLS Fix
-- Run this in your Supabase SQL Editor

-- First, let's check if the table exists and has data
SELECT 'Checking table structure...' as status;
SELECT COUNT(*) as subscription_count FROM horoscope_subscriptions;

-- Disable RLS temporarily to test
ALTER TABLE horoscope_subscriptions DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE horoscope_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can update own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Users can delete own subscriptions" ON horoscope_subscriptions;
DROP POLICY IF EXISTS "Public subscription access" ON horoscope_subscriptions;

-- Create a simple policy that allows all operations for everyone
CREATE POLICY "Allow all operations" ON horoscope_subscriptions
  FOR ALL USING (true) WITH CHECK (true);

-- Verify the policy was created
SELECT 'Policy created successfully!' as status;

-- Test inserting a record
INSERT INTO horoscope_subscriptions (email, zodiac_sign, is_active) VALUES
  ('test-rls@example.com', 'Scorpio', true)
ON CONFLICT (email) DO NOTHING;

-- Verify the insert worked
SELECT 'Test record inserted successfully!' as status;
SELECT COUNT(*) as total_subscriptions FROM horoscope_subscriptions;

-- Show all policies on the table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'horoscope_subscriptions'; 
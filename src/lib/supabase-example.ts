// Example Supabase integration for journal functionality
// This is just an example - you'll need to install @supabase/supabase-js and set up your database

/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Example functions for journal functionality:

export async function saveJournalPrompt(prompt: string, userId: string) {
  const { data, error } = await supabase
    .from('journal_prompts')
    .insert([
      { 
        prompt, 
        user_id: userId, 
        saved_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      }
    ])
  
  if (error) {
    console.error('Error saving journal prompt:', error)
    throw error
  }
  
  return data
}

export async function getSavedPrompts(userId: string) {
  const { data, error } = await supabase
    .from('journal_prompts')
    .select('*')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching saved prompts:', error)
    throw error
  }
  
  return data
}

// Database schema example:
/*
CREATE TABLE journal_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE journal_prompts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own prompts
CREATE POLICY "Users can view own prompts" ON journal_prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompts" ON journal_prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
*/ 
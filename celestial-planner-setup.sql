-- Create table for tracking celestial planner purchases
CREATE TABLE IF NOT EXISTS celestial_planner_purchases (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  customer_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_celestial_planner_session_id ON celestial_planner_purchases(session_id);
CREATE INDEX IF NOT EXISTS idx_celestial_planner_email ON celestial_planner_purchases(customer_email);

-- Add RLS (Row Level Security) if needed
ALTER TABLE celestial_planner_purchases ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view their own purchases
CREATE POLICY "Users can view their own celestial planner purchases" ON celestial_planner_purchases
  FOR SELECT USING (auth.email() = customer_email);

-- Create policy for service role to insert purchases
CREATE POLICY "Service role can insert celestial planner purchases" ON celestial_planner_purchases
  FOR INSERT WITH CHECK (true); 
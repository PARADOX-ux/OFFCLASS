-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  university TEXT,
  graduation_year INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Opportunities table
CREATE TABLE opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  deadline DATE,
  eligibility TEXT,
  link TEXT NOT NULL,
  compensation TEXT,
  remote BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'verified', 'demo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Skills table
CREATE TABLE skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  learning_time_weeks INTEGER,
  beginner_project TEXT,
  portfolio_project TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL,
  event_type TEXT NOT NULL,
  city TEXT,
  eligibility TEXT,
  link TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Saved Items table (for bookmarks)
CREATE TABLE saved_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL, -- Can be UUID from DB or string ID from demo data
  item_type TEXT NOT NULL CHECK (item_type IN ('opportunity', 'skill', 'event', 'tool', 'career')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, item_id, item_type)
);

-- Tools Usage analytics table
CREATE TABLE tools_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  tool_id TEXT NOT NULL,
  action TEXT NOT NULL, -- 'view', 'calculate', 'complete'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)

-- Profiles: Users can read and update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Opportunities: Anyone can read published opportunities, admins can do all
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published opportunities" ON opportunities FOR SELECT USING (status = 'published');

-- Saved Items: Users can CRUD their own saves
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own saved items" ON saved_items FOR ALL USING (auth.uid() = user_id);

-- Tools Usage: Users can insert their own usage (or anonymous if user_id is null)
ALTER TABLE tools_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert tool usage" ON tools_usage FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

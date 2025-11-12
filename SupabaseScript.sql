-- =====================================================
-- WeCare Supabase Database Setup Script
-- =====================================================
-- This script creates all necessary tables for the WeCare donation platform
-- Run this in Supabase SQL Editor to set up your database

-- =====================================================
-- WeCare Supabase Database Setup Script
-- =====================================================
-- This script creates all necessary tables for the WeCare donation platform
-- Run this in Supabase SQL Editor to set up your database

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
-- Extended user profile information
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    name TEXT,
    phone TEXT,
    membership_start_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. DONATIONS TABLE
-- =====================================================
-- Main donations table for goods, cash, and general donations
CREATE TABLE public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL, -- 'Goods', 'Cash', 'Service' or specific categories
    quantity INTEGER DEFAULT 1,
    delivery_type TEXT CHECK (delivery_type IN ('Pick', 'Drop')),
    description TEXT,
    brand TEXT,
    gender TEXT,
    expiration_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. SERVICE_DONATIONS TABLE
-- =====================================================
-- Specialized table for service donations
CREATE TABLE public.service_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    service_category TEXT NOT NULL CHECK (service_category IN (
        'Automotive', 'Professional', 'HomeMaintenance', 
        'Educational', 'Medical', 'Other'
    )),
    description TEXT NOT NULL,
    location_preference TEXT CHECK (location_preference IN ('Remote', 'InPerson')) NOT NULL,
    availability TEXT NOT NULL, -- Formatted string: "Monday: 9:00 - 17:00, Tuesday: 10:00 - 16:00"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. DONATION_CATEGORIES TABLE (Reference Data)
-- =====================================================
-- Reference table for donation categories
CREATE TABLE public.donation_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    points_per_item INTEGER DEFAULT 25, -- Points awarded per donation item
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. USER_ACTIVITIES TABLE (Optional - for tracking user activity)
-- =====================================================
-- Track user activities and achievements
CREATE TABLE public.user_activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL, -- 'donation', 'service', 'achievement'
    description TEXT NOT NULL,
    points_earned INTEGER DEFAULT 0,
    metadata JSONB, -- Additional data about the activity
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_donations_user_id ON public.donations(user_id);
CREATE INDEX idx_donations_category ON public.donations(category);
CREATE INDEX idx_donations_created_at ON public.donations(created_at);

CREATE INDEX idx_service_donations_user_id ON public.service_donations(user_id);
CREATE INDEX idx_service_donations_category ON public.service_donations(service_category);
CREATE INDEX idx_service_donations_created_at ON public.service_donations(created_at);

CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Users can only see and edit their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Donations policies
CREATE POLICY "Users can view own donations" ON public.donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations" ON public.donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donations" ON public.donations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own donations" ON public.donations
    FOR DELETE USING (auth.uid() = user_id);

-- Service donations policies
CREATE POLICY "Users can view own service donations" ON public.service_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own service donations" ON public.service_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service donations" ON public.service_donations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own service donations" ON public.service_donations
    FOR DELETE USING (auth.uid() = user_id);

-- Donation categories are public read-only
CREATE POLICY "Anyone can view donation categories" ON public.donation_categories
    FOR SELECT USING (true);

-- User activities policies
CREATE POLICY "Users can view own activities" ON public.user_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities" ON public.user_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON public.donations
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_service_donations_updated_at BEFORE UPDATE ON public.service_donations
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name');
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =====================================================
-- INITIAL REFERENCE DATA
-- =====================================================

-- Insert default donation categories
INSERT INTO public.donation_categories (name, description, points_per_item) VALUES
    ('Clothing', 'Clothing and apparel donations', 50),
    ('Books & educational materials', 'Books, stationery, and educational resources', 50),
    ('Electronics', 'Electronic devices and gadgets', 40),
    ('Furniture', 'Home and office furniture', 35),
    ('Medical supplies', 'Medical equipment and supplies', 60),
    ('Toys & games', 'Children toys and games', 30),
    ('Hygiene', 'Personal hygiene products', 45),
    ('Household', 'Household items and utensils', 25),
    ('Non - perishable food', 'Canned goods and non-perishable items', 55),
    ('Cash', 'Monetary donations', 30),
    ('Service', 'Volunteer services and skills', 100),
    ('Other', 'Other miscellaneous donations', 25);

-- =====================================================
-- HELPER VIEWS
-- =====================================================

-- View for user donation summary
CREATE OR REPLACE VIEW user_donation_summary AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    COUNT(d.id) as total_donations,
    COALESCE(SUM(d.quantity), 0) as total_items_donated,
    COUNT(sd.id) as total_service_donations,
    COALESCE(SUM(d.quantity * COALESCE(dc.points_per_item, 25)), 0) + 
    COALESCE(SUM(CASE WHEN sd.id IS NOT NULL THEN 100 ELSE 0 END), 0) as total_points
FROM users u
LEFT JOIN donations d ON u.id = d.user_id
LEFT JOIN service_donations sd ON u.id = sd.user_id
LEFT JOIN donation_categories dc ON d.category = dc.name
GROUP BY u.id, u.name, u.email;

-- View for donation statistics
CREATE OR REPLACE VIEW donation_statistics AS
SELECT 
    category,
    COUNT(*) as donation_count,
    SUM(quantity) as total_quantity,
    AVG(quantity) as avg_quantity,
    COUNT(DISTINCT user_id) as unique_donors,
    DATE_TRUNC('month', created_at) as month
FROM donations
GROUP BY category, DATE_TRUNC('month', created_at)
ORDER BY month DESC, donation_count DESC;

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Uncomment the following section if you want to insert sample data for testing

/*
-- Sample users (these would normally be created via auth)
-- Note: These UUIDs should match actual auth.users IDs for testing

INSERT INTO public.users (id, email, name, phone) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'user1@example.com', 'John Doe', '+27123456789'),
    ('550e8400-e29b-41d4-a716-446655440001', 'user2@example.com', 'Jane Smith', '+27987654321');

-- Sample donations
INSERT INTO public.donations (user_id, category, quantity, delivery_type, description) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Clothing', 5, 'Drop', 'Gently used winter jackets'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Books & educational materials', 12, 'Pick', 'Children story books'),
    ('550e8400-e29b-41d4-a716-446655440000', 'Hygiene', 3, 'Drop', 'Soap and toothpaste');

-- Sample service donations
INSERT INTO public.service_donations (user_id, service_category, description, location_preference, availability) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Educational', 'Math tutoring for high school students', 'Remote', 'Monday: 18:00 - 20:00, Wednesday: 18:00 - 20:00, Friday: 18:00 - 20:00'),
    ('550e8400-e29b-41d4-a716-446655440000', 'Professional', 'Free tax consultation services', 'InPerson', 'Saturday: 09:00 - 15:00');
*/

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE public.users IS 'Extended user profile information linked to auth.users';
COMMENT ON TABLE public.donations IS 'Main donations table for goods, cash, and general donations';
COMMENT ON TABLE public.service_donations IS 'Specialized table for service and volunteer donations';
COMMENT ON TABLE public.donation_categories IS 'Reference table for donation categories with point values';
COMMENT ON TABLE public.user_activities IS 'Track user activities and achievements';

COMMENT ON COLUMN public.donations.delivery_type IS 'Pick: WeCare arranges pickup, Drop: Donor delivers directly';
COMMENT ON COLUMN public.donations.expiration_date IS 'For items with expiry dates (food, medicine, etc.)';
COMMENT ON COLUMN public.service_donations.availability IS 'Formatted string with day and time ranges';
COMMENT ON COLUMN public.user_activities.metadata IS 'JSON data for flexible activity tracking';

-- =====================================================
-- SETUP COMPLETE
-- =====================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
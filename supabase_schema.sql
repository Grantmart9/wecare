-- =============================================
-- WECARE COMMUNITY DONATION PLATFORM SCHEMA
-- =============================================
-- This script creates all the tables needed for the WeCare app
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE
-- =============================================
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location TEXT,
    avatar_url TEXT,
    membership_start_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- DONATIONS TABLE (GOODS)
-- =============================================
CREATE TABLE donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL CHECK (
        category IN (
            'Electronics', 'Clothing', 'Books and Educational Materials', 
            'Non-Perishable Foods', 'Furniture', 'Medical Supplies', 
            'Toys and Games', 'Hygiene', 'Household'
        )
    ),
    description TEXT NOT NULL,
    delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('Pick', 'Drop')),
    
    -- Category-specific fields
    brand VARCHAR(255),           -- For electronics
    gender VARCHAR(20),           -- For clothing (Men, Women, Children, Other)
    quantity INTEGER,             -- For books, furniture, toys
    expiration_date DATE,         -- For food, medical supplies
    age_group VARCHAR(50),        -- For toys (e.g., "3-7 years")
    
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (
        status IN ('pending', 'approved', 'collected', 'delivered', 'cancelled')
    ),
    pickup_address TEXT,
    delivery_address TEXT,
    scheduled_pickup_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- CASH DONATIONS TABLE
-- =============================================
CREATE TABLE cash_donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50) NOT NULL CHECK (
        payment_method IN (
            'Credit/debit card', 'EFT', 'Cash', 'SnapScan', 
            'Zapper', 'Payfast', 'Apple Pay', 'Google Pay', 'Samsung Pay'
        )
    ),
    transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (
        status IN ('pending', 'completed', 'failed', 'refunded')
    ),
    purpose TEXT,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency VARCHAR(20) CHECK (
        recurring_frequency IN ('weekly', 'monthly', 'quarterly', 'annually') OR recurring_frequency IS NULL
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SERVICE DONATIONS TABLE
-- =============================================
CREATE TABLE service_donations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    service_category VARCHAR(50) NOT NULL CHECK (
        service_category IN (
            'Automotive', 'Professional', 'HomeMaintenance', 
            'Educational', 'Medical', 'Other'
        )
    ),
    description TEXT NOT NULL,
    is_remote BOOLEAN NOT NULL DEFAULT FALSE,
    availability TEXT NOT NULL,
    skills TEXT[],
    tools_required TEXT,
    estimated_duration VARCHAR(100),
    location_preference TEXT,
    image_url TEXT,
    status VARCHAR(20) DEFAULT 'available' CHECK (
        status IN ('available', 'in_progress', 'completed', 'cancelled')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- COMMUNITY PROJECTS TABLE
-- =============================================
CREATE TABLE community_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    volunteer_count INTEGER DEFAULT 0,
    target_volunteers INTEGER,
    start_date DATE,
    end_date DATE,
    location TEXT,
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'planning' CHECK (
        status IN ('planning', 'active', 'completed', 'cancelled')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EVENTS TABLE
-- =============================================
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_required BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (
        status IN ('upcoming', 'ongoing', 'completed', 'cancelled')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- EVENT REGISTRATIONS TABLE
-- =============================================
CREATE TABLE event_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'registered' CHECK (
        status IN ('registered', 'attended', 'cancelled')
    ),
    UNIQUE(event_id, user_id)
);

-- =============================================
-- SOCIAL MEDIA POSTS TABLE
-- =============================================
CREATE TABLE social_media_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    platform VARCHAR(50) DEFAULT 'wecare',
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- VIDEOS TABLE
-- =============================================
CREATE TABLE videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration VARCHAR(10), -- Format: "MM:SS"
    uploader_id UUID REFERENCES users(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- BENEFICIARIES TABLE
-- =============================================
CREATE TABLE beneficiaries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    organization_type VARCHAR(100), -- e.g., "Shelter", "School", "Family"
    description TEXT,
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (
        verification_status IN ('pending', 'verified', 'rejected')
    ),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- DONATION ASSIGNMENTS TABLE
-- =============================================
CREATE TABLE donation_assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    donation_id UUID REFERENCES donations(id) ON DELETE CASCADE,
    beneficiary_id UUID REFERENCES beneficiaries(id) ON DELETE CASCADE,
    assigned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    delivery_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'assigned' CHECK (
        status IN ('assigned', 'in_transit', 'delivered', 'cancelled')
    ),
    notes TEXT,
    UNIQUE(donation_id, beneficiary_id)
);

-- =============================================
-- NOTIFICATIONS TABLE
-- =============================================
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (
        type IN ('donation_status', 'event_reminder', 'project_update', 'general')
    ),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- USER PREFERENCES TABLE
-- =============================================
CREATE TABLE user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    push_notifications BOOLEAN DEFAULT FALSE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    theme VARCHAR(20) DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
    language VARCHAR(10) DEFAULT 'en',
    preferred_donation_categories TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- IMPACT STATS TABLE
-- =============================================
CREATE TABLE impact_stats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL UNIQUE,
    metric_value INTEGER NOT NULL DEFAULT 0,
    metric_description TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial impact stats
INSERT INTO impact_stats (metric_name, metric_value, metric_description) VALUES
('items_donated', 10000, 'Total number of items donated through the platform'),
('people_helped', 5000, 'Number of people who have received donations'),
('active_volunteers', 500, 'Number of active volunteers on the platform'),
('community_projects', 50, 'Number of active community projects');

-- =============================================
-- VOLUNTEER PROJECTS TABLE (Many-to-Many)
-- =============================================
CREATE TABLE volunteer_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES community_projects(id) ON DELETE CASCADE,
    role VARCHAR(100),
    joined_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active' CHECK (
        status IN ('active', 'completed', 'left')
    ),
    hours_contributed INTEGER DEFAULT 0,
    UNIQUE(user_id, project_id)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;

-- Donations table indexes
CREATE INDEX idx_donations_user_id ON donations(user_id);
CREATE INDEX idx_donations_category ON donations(category);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Cash donations table indexes
CREATE INDEX idx_cash_donations_user_id ON cash_donations(user_id);
CREATE INDEX idx_cash_donations_status ON cash_donations(status);
CREATE INDEX idx_cash_donations_created_at ON cash_donations(created_at DESC);

-- Service donations table indexes
CREATE INDEX idx_service_donations_user_id ON service_donations(user_id);
CREATE INDEX idx_service_donations_category ON service_donations(service_category);
CREATE INDEX idx_service_donations_status ON service_donations(status);

-- Events table indexes
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer ON events(organizer_id);

-- Notifications table indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_projects ENABLE ROW LEVEL SECURITY;

-- Users: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Donations: Users can manage their own donations, admins can see all
CREATE POLICY "Users can view own donations" ON donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own donations" ON donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own donations" ON donations
    FOR UPDATE USING (auth.uid() = user_id);

-- Cash donations: Users can manage their own cash donations
CREATE POLICY "Users can view own cash donations" ON cash_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own cash donations" ON cash_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Service donations: Users can manage their own service donations
CREATE POLICY "Users can view own service donations" ON service_donations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own service donations" ON service_donations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service donations" ON service_donations
    FOR UPDATE USING (auth.uid() = user_id);

-- Community projects: Public read access, restricted write access
CREATE POLICY "Anyone can view community projects" ON community_projects
    FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Project organizers can update projects" ON community_projects
    FOR UPDATE USING (auth.uid() = organizer_id);

-- Events: Public read access, restricted write access
CREATE POLICY "Anyone can view events" ON events
    FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Event organizers can update events" ON events
    FOR UPDATE USING (auth.uid() = organizer_id);

-- Event registrations: Users can manage their own registrations
CREATE POLICY "Users can view own event registrations" ON event_registrations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own event registrations" ON event_registrations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own event registrations" ON event_registrations
    FOR UPDATE USING (auth.uid() = user_id);

-- Social media posts: Public read access, users can manage their own
CREATE POLICY "Anyone can view social media posts" ON social_media_posts
    FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Users can create own posts" ON social_media_posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON social_media_posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Videos: Public read access
CREATE POLICY "Anyone can view videos" ON videos
    FOR SELECT TO PUBLIC USING (true);

-- Beneficiaries: Public read access for verified beneficiaries
CREATE POLICY "Anyone can view verified beneficiaries" ON beneficiaries
    FOR SELECT TO PUBLIC USING (verification_status = 'verified');

-- Notifications: Users can only see their own notifications
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- User preferences: Users can manage their own preferences
CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- Volunteer projects: Users can manage their own volunteer assignments
CREATE POLICY "Users can view own volunteer projects" ON volunteer_projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own volunteer assignments" ON volunteer_projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own volunteer assignments" ON volunteer_projects
    FOR UPDATE USING (auth.uid() = user_id);

-- Impact stats: Public read access
CREATE POLICY "Anyone can view impact stats" ON impact_stats
    FOR SELECT TO PUBLIC USING (true);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cash_donations_updated_at BEFORE UPDATE ON cash_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_donations_updated_at BEFORE UPDATE ON service_donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_projects_updated_at BEFORE UPDATE ON community_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_media_posts_updated_at BEFORE UPDATE ON social_media_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beneficiaries_updated_at BEFORE UPDATE ON beneficiaries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update impact stats automatically
CREATE OR REPLACE FUNCTION update_impact_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update items donated count
    UPDATE impact_stats 
    SET metric_value = (SELECT COUNT(*) FROM donations WHERE status = 'delivered'),
        last_updated = NOW()
    WHERE metric_name = 'items_donated';
    
    -- Update active volunteers count
    UPDATE impact_stats 
    SET metric_value = (SELECT COUNT(DISTINCT user_id) FROM volunteer_projects WHERE status = 'active'),
        last_updated = NOW()
    WHERE metric_name = 'active_volunteers';
    
    -- Update community projects count
    UPDATE impact_stats 
    SET metric_value = (SELECT COUNT(*) FROM community_projects WHERE status = 'active'),
        last_updated = NOW()
    WHERE metric_name = 'community_projects';
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Triggers to automatically update impact stats
CREATE TRIGGER update_stats_on_donation_change 
    AFTER INSERT OR UPDATE OR DELETE ON donations
    FOR EACH STATEMENT EXECUTE FUNCTION update_impact_stats();

CREATE TRIGGER update_stats_on_volunteer_change 
    AFTER INSERT OR UPDATE OR DELETE ON volunteer_projects
    FOR EACH STATEMENT EXECUTE FUNCTION update_impact_stats();

CREATE TRIGGER update_stats_on_project_change 
    AFTER INSERT OR UPDATE OR DELETE ON community_projects
    FOR EACH STATEMENT EXECUTE FUNCTION update_impact_stats();

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for donation summary by category
CREATE VIEW donation_summary_by_category AS
SELECT 
    category,
    COUNT(*) as total_donations,
    COUNT(*) FILTER (WHERE status = 'delivered') as delivered_donations,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_donations
FROM donations 
GROUP BY category;

-- View for user donation activity
CREATE VIEW user_donation_activity AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    COUNT(d.id) as total_donations,
    COUNT(cd.id) as cash_donations,
    COUNT(sd.id) as service_donations,
    COALESCE(SUM(cd.amount), 0) as total_cash_donated
FROM users u
LEFT JOIN donations d ON u.id = d.user_id
LEFT JOIN cash_donations cd ON u.id = cd.user_id AND cd.status = 'completed'
LEFT JOIN service_donations sd ON u.id = sd.user_id
GROUP BY u.id, u.name, u.email;

-- View for upcoming events with registration counts
CREATE VIEW upcoming_events_with_registrations AS
SELECT 
    e.*,
    COUNT(er.id) as registered_count
FROM events e
LEFT JOIN event_registrations er ON e.id = er.event_id AND er.status = 'registered'
WHERE e.event_date > NOW() AND e.status = 'upcoming'
GROUP BY e.id;

-- =============================================
-- SAMPLE DATA (OPTIONAL)
-- =============================================

-- Insert sample users (for testing purposes)
-- Note: In production, users will be created through Supabase Auth
/*
INSERT INTO users (id, email, name, phone, location) VALUES
    ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com', 'John Doe', '+27123456789', 'Cape Town'),
    ('22222222-2222-2222-2222-222222222222', 'jane.smith@example.com', 'Jane Smith', '+27987654321', 'Johannesburg'),
    ('33333333-3333-3333-3333-333333333333', 'admin@wecare.com', 'Admin User', '+27111222333', 'Pretoria');
*/

-- =============================================
-- COMPLETION MESSAGE
-- =============================================
-- Schema creation completed successfully!
-- Remember to:
-- 1. Set up Supabase Auth for user authentication
-- 2. Configure storage buckets for images/files
-- 3. Set up real-time subscriptions if needed
-- 4. Configure email templates for notifications
-- 5. Test all RLS policies thoroughly
-- 6. Backup your database regularly
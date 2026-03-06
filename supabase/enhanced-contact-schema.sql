-- =====================================================
-- Enhanced Contact Submissions Table Schema
-- Production-ready with rate limiting and validation
-- =====================================================

-- Create contact_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 255),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 20),
  company_name TEXT CHECK (company_name IS NULL OR char_length(company_name) <= 255),
  service_type TEXT NOT NULL CHECK (service_type IN ('web-development', 'mobile-apps', 'networking', 'consulting', 'other')),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 5000),
  budget_range TEXT CHECK (budget_range IN ('under-10k', '10k-25k', '25k-50k', '50k-100k', '100k-plus', 'not-sure')),
  timeline TEXT CHECK (timeline IN ('asap', '1-3-months', '3-6-months', '6-plus-months')),
  source TEXT,
  user_agent TEXT,
  is_spam BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts for contact submissions" ON contact_submissions;

-- Create policy that allows anonymous inserts
CREATE POLICY "Allow anonymous inserts for contact submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_service_type ON contact_submissions(service_type);

-- =====================================================
-- Rate Limiting Function
-- Prevents same email from submitting more than 3 times per hour
-- =====================================================

CREATE OR REPLACE FUNCTION check_submission_rate()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM contact_submissions
    WHERE email = NEW.email
    AND created_at > NOW() - INTERVAL '1 hour'
  ) >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS rate_limit_check ON contact_submissions;

-- Create trigger for rate limiting
CREATE TRIGGER rate_limit_check
BEFORE INSERT ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION check_submission_rate();

-- =====================================================
-- Verification
-- =====================================================
-- After running this script:
-- 1. Check Supabase Dashboard -> Table Editor -> contact_submissions
-- 2. Verify the table structure matches
-- 3. Check Authentication -> Policies to see the RLS policy
-- 4. Test form submission to ensure it works


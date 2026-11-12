-- =====================================================
-- contact_submissions: the "Book a demo" form table.
-- Works on a new project and on an existing one. Safe to run more than once.
-- Run it in the Supabase SQL editor before deploying.
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  company_size TEXT,
  interested_modules TEXT[],
  service_type TEXT NOT NULL,
  timeline TEXT,
  message TEXT NOT NULL DEFAULT '',
  source TEXT,
  user_agent TEXT,
  is_spam BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Columns added after the first version of the table
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS company_size TEXT;
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS interested_modules TEXT[];

-- Checks. Names match Postgres' auto-generated ones, so old agency-site checks are replaced.
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_name_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_name_check
  CHECK (char_length(name) BETWEEN 2 AND 255);

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_email_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_email_check
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_phone_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_phone_check
  CHECK (phone IS NULL OR char_length(phone) <= 20);

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_company_name_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_company_name_check
  CHECK (company_name IS NULL OR char_length(company_name) <= 255);

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_company_size_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_company_size_check
  CHECK (company_size IS NULL OR company_size IN ('1-50', '51-200', '201-500', '501-1000', '1000-plus'));

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_interested_modules_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_interested_modules_check
  CHECK (interested_modules IS NULL OR cardinality(interested_modules) <= 20);

-- Old agency values kept so existing rows stay valid
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_service_type_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_service_type_check
  CHECK (service_type IN ('demo', 'trial', 'sales',
                          'web-development', 'mobile-apps', 'networking', 'consulting', 'other'));

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_timeline_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_timeline_check
  CHECK (timeline IS NULL OR timeline IN ('asap', '1-3-months', '3-6-months', '6-plus-months'));

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_message_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_message_check
  CHECK (char_length(message) <= 5000);

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_source_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_source_check
  CHECK (source IS NULL OR char_length(source) <= 500);

ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_user_agent_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_user_agent_check
  CHECK (user_agent IS NULL OR char_length(user_agent) <= 500);

-- =====================================================
-- Access: anonymous visitors may only INSERT, and only the columns the form sends.
-- They cannot read, update or delete (no policies for those), and cannot set
-- is_spam or created_at.
-- =====================================================

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts for contact submissions" ON contact_submissions;

CREATE POLICY "Allow anonymous inserts for contact submissions"
ON contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

REVOKE INSERT ON contact_submissions FROM anon;
GRANT INSERT (name, email, phone, company_name, company_size, interested_modules,
              service_type, timeline, message, source, user_agent)
  ON contact_submissions TO anon;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_service_type ON contact_submissions(service_type);

-- =====================================================
-- Rate limit: at most 3 submissions per email per hour.
-- SECURITY DEFINER is required: the trigger runs as the anonymous visitor, who
-- cannot read the table under RLS, so without it the count is always 0.
-- =====================================================

CREATE OR REPLACE FUNCTION check_submission_rate()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

DROP TRIGGER IF EXISTS rate_limit_check ON contact_submissions;

CREATE TRIGGER rate_limit_check
BEFORE INSERT ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION check_submission_rate();

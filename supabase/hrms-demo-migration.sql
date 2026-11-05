-- =====================================================
-- HRMS demo-request migration
-- Run this in the Supabase SQL editor BEFORE deploying the HRMS site.
-- The new "Book a demo" form sends values the old constraints reject.
-- Safe to run more than once.
-- =====================================================

-- New request types (old agency values kept so existing rows stay valid)
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_service_type_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_service_type_check
  CHECK (service_type IN ('demo', 'trial', 'sales',
                          'web-development', 'mobile-apps', 'networking', 'consulting', 'other'));

-- Message is now optional on the form
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_message_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_message_check
  CHECK (char_length(message) <= 5000);

-- New lead fields
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS company_size TEXT;
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_company_size_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_company_size_check
  CHECK (company_size IS NULL OR company_size IN ('1-50', '51-200', '201-500', '501-1000', '1000-plus'));

ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS interested_modules TEXT[];

-- Source now includes the query string (e.g. /contact/?type=trial&plan=growth)
ALTER TABLE contact_submissions DROP CONSTRAINT IF EXISTS contact_submissions_source_check;
ALTER TABLE contact_submissions ADD CONSTRAINT contact_submissions_source_check
  CHECK (source IS NULL OR char_length(source) <= 500);

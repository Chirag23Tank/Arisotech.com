# Supabase Database Setup

## Production-Ready Contact Form Setup

The contact form requires a proper database schema and RLS (Row Level Security) policy to allow anonymous users to submit forms securely.

## Quick Setup (Recommended for Production)

### Step 1: Create Enhanced Database Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the SQL from `enhanced-contact-schema.sql`
4. Click **Run**

This will:
- ✅ Create the `contact_submissions` table with proper constraints
- ✅ Set up RLS policies for security
- ✅ Add indexes for better performance
- ✅ Implement rate limiting (3 submissions per hour per email)
- ✅ Add validation at database level

### Step 2: Verify Setup

After running the SQL:

1. Go to **Table Editor** → `contact_submissions` - verify table structure
2. Go to **Authentication** → **Policies** - verify RLS policy exists
3. Check **Database** → **Functions** - verify `check_submission_rate` function exists

### Step 3: Test the Form

1. Submit a test contact form on your website
2. Check Supabase Dashboard → **Table Editor** → `contact_submissions`
3. You should see the new submission

## Alternative: Basic Setup (If table already exists)

If you already have a `contact_submissions` table, use `fix-rls-policy.sql` to just fix the RLS policy:

1. Go to **SQL Editor**
2. Copy and paste the SQL from `fix-rls-policy.sql`
3. Click **Run**

## Security Features

### ✅ Row Level Security (RLS)
- Anonymous users can INSERT (submit forms)
- Anonymous users CANNOT read other submissions
- Anonymous users CANNOT update or delete
- Only server-side code (with service role key) can read all submissions

### ✅ Rate Limiting
- Database-level rate limiting: 3 submissions per hour per email
- Client-side rate limiting: 5 seconds between submissions
- Prevents spam and abuse

### ✅ Data Validation
- Database constraints ensure data integrity
- Client-side validation with Zod
- Server-side validation at database level

### ✅ Spam Protection
- Honeypot field (invisible to users, catches bots)
- Suspicious content detection
- User agent tracking

## Production Checklist

- [ ] Run `enhanced-contact-schema.sql` in Supabase
- [ ] Verify RLS policy is active
- [ ] Test form submission
- [ ] Check that submissions appear in database
- [ ] Verify rate limiting works (try submitting 4 times quickly)
- [ ] Set up environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Troubleshooting

### Form not saving?
1. Check browser console for errors
2. Verify Supabase environment variables are set
3. Check RLS policy is active in Supabase Dashboard
4. Verify table name matches: `contact_submissions`

### Rate limit errors?
- This is expected behavior - wait 1 hour or use a different email
- Rate limit: 3 submissions per hour per email address

### Permission denied errors?
- Run the RLS policy SQL again
- Check that the policy allows INSERT for `anon` role


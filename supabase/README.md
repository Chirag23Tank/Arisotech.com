# Supabase setup

The demo form inserts rows into `contact_submissions` using the public anon key.

## Set up or update the database

1. Supabase Dashboard → **SQL Editor**
2. Paste [enhanced-contact-schema.sql](enhanced-contact-schema.sql) and click **Run**

It works on a new project and on an existing table, and is safe to run again.

## What it enforces

- **Insert only:** anonymous visitors can insert rows, but cannot read, update or delete them.
- **Only form columns:** visitors can set only the fields the form sends. `is_spam` and `created_at` are not theirs to set.
- **Limits:** lengths, allowed values, and at most 20 modules per request.
- **Rate limit:** 3 submissions per email per hour. The form shows a friendly message when it is hit.
- **Honeypot:** a hidden field in the form. Bots that fill it are silently ignored.

Read submissions in **Table Editor → contact_submissions** (or with the service role key on a server, never in the site).

## Check it works

1. Submit the form on `/contact/`; the row appears in the table.
2. Submit 4 times with the same email; the 4th shows the rate-limit message.

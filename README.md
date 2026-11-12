# Arisotech HRMS website

Marketing site for Arisotech HRMS. Next.js 16, Tailwind 4, exported as static HTML.
The only backend is the "Book a demo" form, which inserts into a Supabase table from the browser.

## Setup

1. `npm install`
2. Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_SITE_URL=https://arisotech.com
   ```
   Both Supabase values are public and end up in the built pages. Never put the service role key here.
3. Database: run [supabase/enhanced-contact-schema.sql](supabase/enhanced-contact-schema.sql) in the Supabase SQL editor (see [supabase/README.md](supabase/README.md)).
4. `npm run dev` and open http://localhost:3000

## Build and deploy

```bash
npm run build
```

This writes the whole site to `out/` (a postbuild script fixes Next 16's segment file names).
Upload the contents of `out/` to any static host. There is no server to run.

## Where things live

- `content/*.json`: site config, modules, pricing
- `app/`: one folder per page
- `components/`: layout, home sections, product previews, the demo form
- `supabase/`: the database schema

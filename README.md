# Nehal Shaikh — Web Resume

Next.js 16 · Tailwind CSS v4 · shadcn/ui · Framer Motion · Zod + React Hook Form

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Editing content
All content (profile, skills, experience, projects, videos) lives in `src/lib/data.ts`.
The profile photo and resume PDF are hosted on Vercel Blob (not in the repo); their URLs
are `profile.avatar` and `profile.resume` in `src/lib/data.ts`. To update one, upload the new
file in Vercel → Storage → Blob and update the URL there.

## Environment (see `.env.example`)
- `NEXT_PUBLIC_SITE_URL` — production URL, used for canonical/OG/sitemap.
- `RESEND_API_KEY` (optional) — contact form sends email directly via Resend.
  Without it the form still validates and opens the visitor's email app.

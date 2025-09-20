# RP Studios — One-Upload Vercel App

Upload once → set envs → deploy. Auth-gated + DB migrated + seed runs automatically.

## Preloaded Admin
- Email: brayden720@icloud.com
- Password: Chandler0720 (stored **bcrypt-hashed**)

## Environment Variables (Vercel → Settings → Environment Variables)
- `DATABASE_URL` — Postgres (use Vercel Postgres)
- `NEXTAUTH_SECRET` — long random string
- `DEMO_MODE` — `true` to mock Square & invoices (default in .env.example)
- `SQUARE_*` — only if `DEMO_MODE=false`

## Build on Vercel
The build runs `prisma generate` → `migrate deploy` → `seed` → `next build`.

## Routes included
- `/sign-in` — login wall (NextAuth)
- `/` — admin links page (protected)
- `/admin/promotions` — view seeded promos
- `/client/billing` — mock update card + invoices
- `/admin/store` — catalog list
- `/admin/crm` • `/admin/calendar` • `/admin/ai-timeline` — placeholders

## Next Steps
Plug in your real UIs for Store, CRM, Calendar, AI, etc., keeping this structure so it stays a one-upload deploy.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Database
npm run db:push      # Push Prisma schema to DB (no migration history)
npm run db:migrate   # Create + apply a migration
npm run db:seed      # Seed 10 courses + 7 badges
npm run db:studio    # Open Prisma Studio GUI

# Production
npm run build
npm start
```

Node.js must be loaded via nvm in this environment:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"
```

## Architecture

**Next.js 14 App Router** with three route groups:

- `app/(marketing)/` — public pages (landing, pricing, blog). No auth required. Uses `Navbar` + `Footer` + `ScrollProgressBar`.
- `app/(auth)/` — login/register. Minimal layout. Auto-redirects to `/dashboard` on success.
- `app/(dashboard)/` — protected pages. Server component layout checks session via `getServerSession` and redirects to `/login` if unauthenticated. Uses `Sidebar` with live XP/rank.

**Data flow:**
- All DB access goes through `lib/prisma.ts` (singleton PrismaClient)
- Auth state via NextAuth JWT strategy — session includes `id`, `isPremium`, `level`, `xp`, `streak`
- XP/gamification logic is centralized in `lib/xp.ts`: `addXP()`, `checkBadges()`, `updateStreak()`, `getRank()`
- Progress is saved via `POST /api/progress` which chains XP → streak → badge checks atomically

**Freemium gate:** `CourseCard` and the course `[slug]` page check `course.isPremium && !user.isPremium` and render a paywall overlay. No middleware — gate is at render time.

**Stripe:** Checkout session created in `api/stripe/checkout/route.ts`. Webhook at `api/stripe/webhook/route.ts` handles `checkout.session.completed` (set `isPremium=true`), `customer.subscription.deleted` (set `isPremium=false`), and `invoice.payment_failed` (send email via Resend).

## Key conventions

- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — always use for conditional classNames
- Animations use Framer Motion. Reusable variants live in `hooks/useScrollAnimation.ts` (`fadeUpVariants`, `staggerContainer`, etc.)
- Brand colors are Tailwind custom tokens: `brand-navy` (#26538D), `brand-azure` (#F0FFFF), `brand-dark` (#1A1A2E), `brand-success`, `brand-error`
- Level CSS classes (`level-a1` through `level-c2`) are defined in `globals.css` for colored badges
- `data-cursor="magnetic"` on any element triggers the magnetic pull effect in `CustomCursor`

## Environment

Copy `.env.local.example` to `.env.local`. Requires: PostgreSQL (Supabase/Railway), Google OAuth credentials, Stripe keys, Resend API key. A placeholder `.env.local` exists for running the marketing pages without a database.

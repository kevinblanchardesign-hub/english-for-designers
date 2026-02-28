# 🚀 English For Designers — Guide de démarrage

## 1. Installation des dépendances

```bash
cd ~/Desktop/english-for-designers
npm install
```

## 2. Configuration des variables d'environnement

```bash
cp .env.local.example .env.local
```

Remplissez les variables dans `.env.local` :
- **DATABASE_URL** : Créez une base PostgreSQL sur [Supabase](https://supabase.com) ou [Railway](https://railway.app)
- **NEXTAUTH_SECRET** : `openssl rand -base64 32`
- **GOOGLE_CLIENT_ID/SECRET** : [Google Cloud Console](https://console.cloud.google.com)
- **STRIPE_SECRET_KEY** : [Stripe Dashboard](https://dashboard.stripe.com)
- **RESEND_API_KEY** : [Resend](https://resend.com)

## 3. Base de données

```bash
# Pousser le schéma (sans migrations)
npm run db:push

# Ou avec migrations
npm run db:migrate

# Seeder les données de démo
npm run db:seed
```

## 4. Lancer le projet

```bash
npm run dev
```

→ Ouvrir [http://localhost:3000](http://localhost:3000)

## 5. Stripe (webhooks en local)

```bash
# Installer la CLI Stripe
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward les webhooks vers le serveur local
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copiez le webhook secret affiché et mettez-le dans `STRIPE_WEBHOOK_SECRET`.

## 6. Build de production

```bash
npm run build
npm start
```

## Structure des dossiers

```
app/
├── (marketing)/     # Landing page, pricing, blog
├── (auth)/          # Login, register
├── (dashboard)/     # Dashboard, cours, profil, classement
└── api/             # API Routes Next.js

components/
├── landing/         # Sections de la landing page
├── ui/              # Composants génériques
├── dashboard/       # Widgets du dashboard
├── course/          # Lecteur de cours interactif
└── layout/          # Navbar, Footer, Sidebar, Cursor

lib/                 # Prisma, Auth, Stripe, XP logic
hooks/               # Custom React hooks
prisma/              # Schema + seed data
```

## Déploiement

Recommandé : **Vercel** + **Supabase** (PostgreSQL) + **Cloudflare R2** (storage)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

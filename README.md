# 🌍 CultureView

A community-driven platform where users share authentic cultural experiences and insights about different countries.

## ✨ Features

- 🗺️ Browse cultural insights from 46+ countries
- 📝 Share your experiences (as local, expat, or traveler)
- 🗳️ Vote on opinions (like/dislike)
- 💬 Comment and discuss
- 🏷️ 9 cultural categories (Work, Food, Family, etc.)
- 🔍 Search and filter by country/category
- 🎨 Beautiful organic design

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **Styling:** CSS (Organic Theme)
- **Deployment:** Vercel
- **Performance:** ISR, React.memo, Optimized Images

## Project Structure

```
cultureview/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── layout/     # Layout components
│   │   ├── country/    # Country-specific components
│   │   ├── post/       # Post/opinion components
│   │   ├── comment/    # Comment components
│   │   └── common/     # Shared components
│   ├── lib/            # Utilities and configurations
│   │   ├── db/         # Database client
│   │   ├── auth/       # Authentication config
│   │   ├── utils/      # Helper functions
│   │   ├── hooks/      # Custom React hooks
│   │   └── api/        # API client functions
│   ├── types/          # TypeScript type definitions
│   └── i18n/           # Internationalization (EN/FA)
└── public/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Supabase account)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cultureview
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your database connection string and other required variables.

4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npx prisma db seed
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

## Features

- 🌍 Browse cultural insights from different countries
- 📝 Share personal experiences in predefined cultural categories
- 👍👎 Like/dislike voting system
- 💬 Comment and discuss opinions
- 🔍 Search and filter by country, category, experience type
- 🌐 Multilingual (English/Persian)
- 📱 Responsive design
- 🔐 User authentication and profiles

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables (from `.env.example`)
5. Deploy!

**Auto-deploy:** Every push to `main` branch = automatic deployment

### Environment Variables on Vercel

Go to Project Settings → Environment Variables and add:
```
DATABASE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
NEXT_PUBLIC_SITE_URL
```

## 🎨 Design System

- **Colors:** Warm browns (#c67139), greens (#7a8a5e), cream (#f5ead8)
- **Fonts:** Caprasimo (headings), Figtree (body)
- **Theme:** Organic, warm, handcrafted feel

## 📝 License

MIT License - free to use for your own projects

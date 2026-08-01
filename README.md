# CultureView

A community-driven platform where users share authentic cultural experiences and insights about different countries.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** Supabase Auth

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

## Development Roadmap

See [docs/Features.md](../docs/Features.md) for detailed feature specifications and roadmap.

## License

MIT

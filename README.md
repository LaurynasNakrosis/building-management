# Building Management

A building management and portfolio site built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Contentlayer](https://www.contentlayer.dev/), and [MongoDB](https://www.mongodb.com/).

## Running locally

```bash
git clone <your-repo-url>
cd BuildingManagement
```

Copy `.env.example` to `.env.local` and add your values (MongoDB URI, admin credentials, etc.).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` – development server
- `pnpm build` – production build
- `pnpm start` – start production server
- `pnpm seed` – seed the database with sample data

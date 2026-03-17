# GitHub Stats (Client)

React + TypeScript frontend for GitHub Stats. It provides a simple search flow (enter a GitHub username) and renders an aggregated profile dashboard powered by the local API server.

Local workflow:

1. Choose an API:
   - Deployed: `https://githubgraph.vercel.app`
   - Local: run the backend (`server/README.md`)
2. Set `VITE_API_URL` in `client/.env` to your chosen API base URL.
3. Run the client and open the web URL.

## Tech Stack

- React + TypeScript
- Vite
- @tanstack/react-query for request lifecycle and caching
- Tailwind CSS for styling
- Charts/visualization: Recharts, Visx

## Requirements

- Node.js 18+
- pnpm (recommended)

## Setup

1. Install dependencies

   ```bash
   cd client
   pnpm install
   ```

2. Configure environment variables

   ```bash
   cp .env.example .env
   ```

   - `VITE_API_URL` must point at the API server.
   - If you are using the deployed API, set `VITE_API_URL=https://githubgraph.vercel.app`.
   - If you are running the backend yourself, set it to your backend URL.

3. Start the dev server

   ```bash
   pnpm dev
   ```

Open the URL printed by Vite.

## Scripts

- `pnpm dev`: start Vite dev server
- `pnpm build`: typecheck and build for production
- `pnpm preview`: preview the production build
- `pnpm lint`: run ESLint

## Notes

- This client expects the backend to expose `POST /github` at `VITE_API_URL`.
- Secrets must not be stored in the client; keep tokens in `server/.env` only.

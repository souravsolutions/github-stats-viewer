# GitHub Stats (Server)

Express + TypeScript API for GitHub Stats. This service calls the GitHub GraphQL API, paginates through owned repositories, and returns aggregated stats used by the web client.

Local workflow:

1. Create `server/.env` with `GITHUB_TOKEN` (see `.env.example`).
2. Start the API (`pnpm dev`).
3. Start the frontend and point it to this API (`client/README.md`).

## Requirements

- Node.js 18+ (for built-in `fetch`)
- pnpm (recommended)
- A GitHub Personal Access Token (PAT)

## Setup

1. Install dependencies

   ```bash
   cd server
   pnpm install
   ```

2. Configure environment variables

   ```bash
   cp .env.example .env
   ```

   - `GITHUB_TOKEN` is required.
   - `PORT` is optional; `.env.example` uses `5000`.

Token notes

- Use a fine-grained token when possible and grant only the permissions you need.
- Public profile and repository stats typically work with read-only access to public resources.

3. Run in development

   ```bash
   pnpm dev
   ```

## API

### `POST /github`

Request body

```json
{ "username": "octocat" }
```

Response (high-level)

- `user`: profile basics plus selected totals
- `totalStars`, `totalForks`: aggregates across owned repositories
- `languages`: aggregated language sizes across owned repositories
- `topRepository`: highest-starred owned repository
- `contributions`: contribution totals and calendar data

Example

```bash
curl -X POST "https://githubgraph.vercel.app/github" \
  -H "Content-Type: application/json" \
  -d '{"username":"octocat"}'
```

## Scripts

- `pnpm dev`: run TypeScript directly with file watching
- `pnpm build`: compile TypeScript to `dist/`
- `pnpm start`: run compiled server from `dist/`

## Security

- Treat `GITHUB_TOKEN` as a secret.
- Do not commit `.env` files.
- If a token is exposed, revoke it and rotate immediately.

# GitHub Stats

Small full-stack app that shows a GitHub profile dashboard.

- The backend calls GitHub GraphQL (v4), aggregates stats, and returns JSON.
- The frontend lets you search by username and displays the results.

## Deployed API

- Base URL: https://githubgraph.vercel.app/
- Endpoint: `POST /github`

## Folder Structure

```text
.
├── client/   # React + Vite frontend
└── server/   # Express + TypeScript API
```

## Run Locally

- Backend setup: `server/README.md`
- Frontend setup: `client/README.md`

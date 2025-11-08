# Getting Started

## Prerequisites

- Node.js 18+ (LTS recommended)
- PostgreSQL 13+ running locally or accessible remotely
- Discord Developer account with an application for OAuth2

## Setup

1. Clone and install dependencies:
   - `npm install`
2. Configure environment:
   - `cp .env.example .env`
   - Fill in values: database connection, Discord OAuth client/secret, route prefixes, and CORS origins.
3. Create database schema:
   - Ensure the configured database exists. Models use Sequelize; if migrations are needed they should be managed manually or via future migration tooling.
4. Start the API:
   - `npm start`
   - Default: http://localhost:3000

## Discord OAuth Setup

- In the Discord Developer Portal:
  - Set Redirect URIs to match your `TEST_DISCORD_CALLBACK_URL` (dev) and `LIVE_DISCORD_CALLBACK_URL` (prod).
  - Copy Client ID and Client Secret into `.env`.

## CORS & Environments

- `IS_LIVE=false` uses `TEST_FRONTEND_URL` for allowed origin.
- `IS_LIVE=true` uses `LIVE_FRONTEND_URL` (and allows `LIVE_FRONTEND_URL_SHORT`).

## Database

- Configure `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in `.env`.
- Set `DB_SSL=true` for managed cloud Postgres that require TLS.

## Exploring the API

- Route prefixes are set via `.env` (see `.env.example`).
- Each router in `src/routes/*.js` is mounted at the corresponding env prefix in `server.js`.
- Hit `<prefix>/...` per router. For example, if `API_BADGES_ROUTES=/api/badges`, check GET/POST on that route as defined in `src/routes/badgeRoutes.js`.

## Deployment

- PM2 is used in production as per `deploy.sh`.
- Adjust working directory and process name to your environment.
- Recommended: behind an HTTPS reverse proxy (Nginx/Traefik) and with a durable session store.

## Troubleshooting

- Database connection issues: verify creds, host/port, and TLS settings; check `src/config/database.js` logs.
- CORS errors: verify frontend origin values and `IS_LIVE`.
- OAuth callback mismatch: ensure Discord app redirect URIs match `.env` exactly.
- 404s on routes: verify the env prefix matches your requests and that the router file exists.

# BeowulfAPI

BeowulfAPI is an Express + Node.js backend that powers the Beowulf ecosystem. It provides authenticated endpoints (Discord OAuth2) backed by PostgreSQL (via Sequelize), with modular routes for badges, leaderboards, fleets, scheduling, and more.

This README gives an overview, setup instructions, environment configuration, architecture, and links to deeper docs.

## Quick start

- Prereqs: Node.js 18+, PostgreSQL 13+, a Discord application (for OAuth2)
- Copy env: `cp .env.example .env` and fill in values
- Install: `npm install`
- Run: `npm start` (defaults to http://localhost:3000)

See docs/GettingStarted.md for details.

## Key features

- Express server with CORS + session support
- Discord OAuth2 login using passport-discord
- PostgreSQL via Sequelize
- Modular route mounts controlled by environment variables (flexible prefixes)
- Feature-flagged modules such as the voice channel session tracker (toggle via `VOICE_SESSIONS_ENABLE` and auto-migrate via `VOICE_SESSIONS_AUTO_MIGRATE`)
- Structured controllers and models per feature domain

## Architecture overview

- server.js: application bootstrap, middleware, and route mounting
- src/
  - auth/: Discord Passport strategy configuration
  - config/: database connection (Sequelize)
  - routes/: Express routers for each feature area
  - controllers/: Handlers and business logic for routes
  - models/: Sequelize models (PostgreSQL)
  - logic/, services/: shared domain logic and helpers

Diagram and details in docs/Overview.md.

## Environment configuration

Environment variables control server host/port, CORS, Discord OAuth, Postgres connection, and all API route prefixes. A comprehensive template is provided in `.env.example`.

- CORS origins switch on `IS_LIVE` between TEST and LIVE URLs
- Session secret stored in `SESSION_SECRET`
- Discord OAuth: `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, callback URLs
- Database: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_SSL`
- Route prefixes: All `API_*` variables (see `.env.example`)

See docs/Environment.md for a full reference and examples.

## API surface

Routes are mounted from `src/routes` to prefixes defined in `.env`. Start with docs/API.md for a route index and tips on exploring endpoints. Individual controllers under `src/controllers` implement the behavior.

## Scripts

- `npm start` — start the API server
- `npm test` — (placeholder)

PM2 deployment script: `deploy.sh` (pull, install, restart named process `BeowulfApi`, save)

## Development

- Logging via morgan (dev format)
- JSON + URL-encoded request bodies via body-parser
- Session storage via express-session (in-memory by default; consider a store for production)
- Error handling: centralized 404 forwarder and JSON error formatter

## Security notes

- Set strong `SESSION_SECRET`
- Configure correct CORS origins
- Enable `DB_SSL=true` for managed Postgres with TLS
- Consider a production session store (Redis, Postgres) and reverse proxy HTTPS termination

## Documentation

- docs/Overview.md — architecture and request flow
- docs/GettingStarted.md — local setup and common tasks
- docs/Environment.md — environment variables reference
- docs/API.md — route index and discovery tips

Contributions welcome. Open issues or PRs with improvements.

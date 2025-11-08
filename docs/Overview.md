# Overview

BeowulfAPI is a modular Express + Node.js backend supporting many gameplay and organizational domains (badges, leaderboards, scheduling, fleets, knowledge base, etc.). It uses PostgreSQL via Sequelize and authenticates users through Discord OAuth2.

## High-Level Flow

1. Incoming request hits Express with morgan logging.
2. CORS validates origin based on `IS_LIVE` and configured frontend URLs.
3. Session + Passport handle user authentication state (Discord strategy).
4. Request is routed via prefix environment variables (e.g. `API_BADGES_ROUTES`) to feature router in `src/routes`.
5. Router delegates to a controller function housed in `src/controllers/*Controller.js`.
6. Controller interacts with Sequelize models in `src/models` for persistence.
7. Response returned as JSON, errors pass through a centralized error handler.

## Layering

- Entry: `server.js`
- Routing: `src/routes/*.js` — small route definitions, mount path isn't hardcoded; it's injected by env variable for flexibility.
- Controllers: `src/controllers/*Controller.js` — business logic per domain.
- Models: `src/models/*.js` — Sequelize definitions mapping to Postgres tables.
- Auth: `src/auth/discord.js` — Discord Passport strategy configuration.
- Config: `src/config/database.js` — sets up and authenticates the Sequelize instance.
- Logic/Services: shared reusable transformations or integration logic.

## Environment-driven Mounting

Unlike many APIs that hardcode `/api/<domain>` paths, BeowulfAPI externalizes prefixes to environment variables. This allows:
- Rapid remapping of endpoints during migrations or versioning.
- Selective enabling/disabling by leaving values blank or not mounting.

## Error Handling

- 404 handler constructs an Error with status 404 and forwards to error middleware.
- Final error middleware outputs JSON: `{ error: { message } }`.

## Session & Auth Considerations

- Sessions are stored in-memory by express-session by default (not ideal for horizontal scaling or restarts).
- Passport attaches `req.user` after successful Discord OAuth; scope limited to `identify`.
- Extend auth by persisting Discord user profile in a model on login (currently optional stub).

## Deployment Pattern

Typical deployment via PM2 and `deploy.sh`:
1. Pull latest code.
2. Install updated dependencies.
3. Restart named process (`BeowulfApi`).
4. Persist process list with `pm2 save`.

## Suggested Future Enhancements

- Add automated tests (unit + integration) for critical routes.
- Replace in-memory session with Redis or Postgres store.
- Add rate limiting (e.g. express-rate-limit) to sensitive endpoints.
- Introduce OpenAPI (Swagger) spec generation for endpoints.
- Implement structured logging (e.g. pino) for production.

## Diagram (Conceptual)

```
 [Client] --(HTTPS)--> [Express + Passport] --(Controllers)--> [Sequelize] --> [PostgreSQL]
                                      |                         ^
                                 (Logic/Services)               |
                                      v                         |
                                 [External APIs]
```

## Repository Layout Snapshot

```
server.js
src/
  auth/discord.js
  config/database.js
  routes/*.js
  controllers/*Controller.js
  models/*.js
  logic/*.js
  services/*
```

Refer to docs/API.md for a generated index of available route domains.

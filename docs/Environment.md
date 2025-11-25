# Environment Variables Reference

All environment variables consumed by BeowulfAPI with purpose and notes.

## Core Runtime

| Variable | Description | Default (example) |
|----------|-------------|-------------------|
| HOST | Bind host for Express | localhost |
| PORT | Port for Express | 3000 |
| IS_LIVE | Switch between test and production CORS + callback | false |
| SESSION_SECRET | Secret for session signing | (none) |

## Frontend Origins / CORS

| Variable | Description | Example |
|----------|-------------|---------|
| TEST_FRONTEND_URL | Dev/test frontend origin | http://localhost:5173 |
| LIVE_FRONTEND_URL | Production frontend origin | https://app.example.com |
| LIVE_FRONTEND_URL_SHORT | Alternate short domain | https://example.com |

## Discord OAuth2

| Variable | Description |
|----------|-------------|
| DISCORD_CLIENT_ID | Discord application client ID |
| DISCORD_CLIENT_SECRET | Discord application client secret |
| TEST_DISCORD_CALLBACK_URL | Redirect URI for dev/staging |
| LIVE_DISCORD_CALLBACK_URL | Redirect URI for production |

## PostgreSQL Database

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | beowulf |
| DB_USER | Database user | beowulf_user |
| DB_PASSWORD | Database password | beowulf_password |
| DB_SSL | Require SSL/TLS (true/false) | false |

If using SSL in managed environments (e.g. Heroku, AWS RDS) set `DB_SSL=true`.

## API Route Prefixes

Each router is mounted at a path defined here. All should start with a leading slash.

```
API_CLASS_ROUTES
API_RANK_ROUTES
API_PRESTIGE_ROUTES
API_USER_ROUTES
API_COMPLETED_ENTRY_ROUTES
API_QUEUE_ROUTES
API_BADGES_ROUTES
API_BADGE_REUSABLES_ROUTES
API_BADGE_ACCOLADES_ROUTES
API_UEX_ROUTES
API_THREADS_ROUTES
API_MESSAGES_ROUTES
API_BLACKBOX_ROUTES
API_HITTRACKER_ROUTES
API_SHIPLOG_ROUTES
API_GAMEVERSION_ROUTES
API_LESSONSLEARNED_ROUTES
API_PLAYERSHIP_ROUTES
API_WAREHOUSE_ROUTES
API_KEY_ROUTES
API_REPORT_KILL
API_SCHEDULES
API_EVENTS_ROUTES
API_FLEET_ROUTES
API_PLAYER_EXPERIENCE_ROUTES
API_RECENT_GATHERINGS_ROUTES
API_RECENT_FLEETS
API_LEADERBOARD_SB_ROUTES
API_LEADERBOARD_SB_SUMMARY_ROUTES
API_LEADERBOARD_SB_LOG_ROUTES
API_LEADERBOARD_PIRACY_SUMMARY_ROUTES
API_LEADERBOARD_BLACKBOX_SUMMARY_ROUTES
API_LEADERBOARD_FLEETLOG_SUMMARY_ROUTES
API_BEOWULF_HUNTER_SUMMARY_BY_PATCH_ROUTES
API_VOICE_CHANNEL_SESSIONS_ROUTES
API_EMOJI_ROUTES
API_PLAYER_STATS_ROUTES
API_PROMOTE_PLAYER_ROUTES
API_NOTIFY_AWARD_ROUTES
API_GRANT_PRESTIGE_ROUTES
API_ORG_GOALS_ROUTES
API_LEADERBOARD_SB_ORG_ROUTES
API_LEADERBOARD_SB_ORG_SUMMARY_ROUTES
API_SCI_API_ROUTES
API_VERIFY_USER_ROUTES
API_CALENDAR_AVAILABILITY_ROUTES
API_KNOWLEDGE_ROUTES
API_PLAYER_TRACKER_ROUTES
VOICE_SESSIONS_ENABLE
```

## Strategy

- Keep prefixes stable across environments to reduce client complexity.
- Use versioning (e.g. `/api/v1/...`) by adjusting these variables when introducing breaking changes.

## Tips

- Empty or undefined prefix variables will cause `app.use(undefined, router)` to fail; always set a value.
- Store secrets (Discord, DB) securely outside of version control. `.env.example` is safe to commit.

### Voice Sessions Feature Flag

- `API_VOICE_CHANNEL_SESSIONS_ROUTES` defines the mount point for the voice session REST endpoints (default `/api/voicechannelsessions`).
- `VOICE_SESSIONS_ENABLE` defaults to `true`. Set it to `false` to short-circuit the router entirely when the frontend should not make requests (useful in lower environments that have not applied the `voice_channel_sessions` table).

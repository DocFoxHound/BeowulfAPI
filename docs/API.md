# API Index

This document enumerates route domains exposed by BeowulfAPI. Each router file in `src/routes` maps to a prefix defined in `.env` and mounted in `server.js`.

> NOTE: Specific HTTP methods and parameters depend on the implementation within each `*Routes.js` and its controller. This index is a discovery aid; inspect the router file for endpoint definitions until an OpenAPI spec is added.

## Route Domains

| Prefix Variable | Router File | Domain Purpose |
|-----------------|-------------|----------------|
| API_CLASS_ROUTES | classRoutes.js | Class/category management |
| API_RANK_ROUTES | rankRolesRoutes.js | Rank role definitions |
| API_PRESTIGE_ROUTES | prestigeRolesRoutes.js | Prestige role definitions/grants |
| API_USER_ROUTES | userRoutes.js | User profile & management |
| API_COMPLETED_ENTRY_ROUTES | completedQueueRoutes.js | Completed queue entries |
| API_QUEUE_ROUTES | queueRoutes.js | Active queue operations |
| API_BADGES_ROUTES | badgeRoutes.js | Badge CRUD & assignment |
| API_BADGE_REUSABLES_ROUTES | badgeReusableRoutes.js | Reusable badge templates |
| API_BADGE_ACCOLADES_ROUTES | badgeAccoladesRoutes.js | Badge accolades and meta |
| API_UEX_ROUTES | uexRoutes.js | UEX integration / data |
| API_THREADS_ROUTES | threadRoutes.js | Threaded discussions |
| API_MESSAGES_ROUTES | messageRoutes.js | Messages within threads |
| API_BLACKBOX_ROUTES | blackBoxRoutes.js | Black box records/logs |
| API_HITTRACKER_ROUTES | hitTrackerRoutes.js | Hit tracking events |
| API_SHIPLOG_ROUTES | shipLogRoutes.js | Ship log entries |
| API_GAMEVERSION_ROUTES | gameVersionRoutes.js | Game version metadata |
| API_LESSONSLEARNED_ROUTES | lessonLearnedRoutes.js | Lessons learned repository |
| API_PLAYERSHIP_ROUTES | playerShipRoutes.js | Player ship info |
| API_WAREHOUSE_ROUTES | warehouseRoutes.js | Warehouse/storage data |
| API_KEY_ROUTES | keyRoutes.js | Key management/access control |
| API_REPORT_KILL | reportKillRoutes.js | Kill reporting functionality |
| API_SCHEDULES | scheduleRoutes.js | Scheduling calendar endpoints |
| API_EVENTS_ROUTES | scheduleRoutes.js | Event aliases (same router) |
| API_FLEET_ROUTES | userFleetRoutes.js | Fleet operations & summaries |
| API_PLAYER_EXPERIENCE_ROUTES | playerExperienceRoutes.js | Player XP accumulation |
| API_RECENT_GATHERINGS_ROUTES | recentGatheringsRoutes.js | Recent gatherings overview |
| API_RECENT_FLEETS | recentFleetsRoutes.js | Recent fleet snapshots |
| API_LEADERBOARD_SB_ROUTES | leaderboardSBRoutes.js | Scoreboard leaderboards |
| API_LEADERBOARD_SB_SUMMARY_ROUTES | leaderboardSBSummaryRoutes.js | Scoreboard summary data |
| API_LEADERBOARD_SB_LOG_ROUTES | leaderboardSBLogRoutes.js | Scoreboard log entries |
| API_LEADERBOARD_PIRACY_SUMMARY_ROUTES | leaderboardPiracySummaryRoutes.js | Piracy summary stats |
| API_LEADERBOARD_BLACKBOX_SUMMARY_ROUTES | leaderboardBlackboxSummaryRoutes.js | Blackbox summary stats |
| API_LEADERBOARD_FLEETLOG_SUMMARY_ROUTES | leaderboardFleetlogSummaryRoutes.js | Fleet log summary stats |
| API_BEOWULF_HUNTER_SUMMARY_BY_PATCH_ROUTES | beowulfHunterSummaryByPatchRoutes.js | Hunter summary (patch segmented) |
| API_VOICE_CHANNEL_SESSIONS_ROUTES | voiceChannelSessionsRoutes.js | Voice channel session tracking |
| API_EMOJI_ROUTES | emojiRoutes.js | Emoji data & usage |
| API_PLAYER_STATS_ROUTES | playerStatsRoutes.js | Player statistical aggregates |
| API_PROMOTE_PLAYER_ROUTES | promoteRoutes.js | Player promotion actions |
| API_NOTIFY_AWARD_ROUTES | notifyAwardRoutes.js | Notification of awards |
| API_GRANT_PRESTIGE_ROUTES | grantPrestigeRoutes.js | Granting prestige roles |
| API_ORG_GOALS_ROUTES | orgGoalsRoutes.js | Organization goals management |
| API_LEADERBOARD_SB_ORG_ROUTES | leaderboardSBOrgRoutes.js | Org scoreboard leaderboards |
| API_LEADERBOARD_SB_ORG_SUMMARY_ROUTES | leaderboardSBOrgSummaryRoutes.js | Org scoreboard summaries |
| API_SCI_API_ROUTES | starcitizen-apiRoutes.js | External Star Citizen API integration |
| API_VERIFY_USER_ROUTES | verifyUserRoutes.js | User verification workflow |
| API_CALENDAR_AVAILABILITY_ROUTES | calendarAvailabilityRoutes.js | Calendar availability slots |
| API_KNOWLEDGE_ROUTES | knowledgeRoutes.js | Knowledge base entries |
| API_PLAYER_TRACKER_ROUTES | playerTrackerRoutes.js | Player tracking & metrics |

## Authentication

- Discord OAuth2 provides user identity; rely on session cookies for subsequent authenticated requests.
- Some routes may enforce auth (check router/controller middleware usage).

## Conventions

- JSON request/response bodies.
- Errors: standardized JSON `{ error: { message } }`.
- Route prefix versioning can be introduced by adjusting env variables (e.g., `/api/v2/...`).

## Next Steps

To enhance API discoverability:
- Add Swagger/OpenAPI spec generation.
- Provide example requests/responses per domain.
- Document auth requirements per endpoint.

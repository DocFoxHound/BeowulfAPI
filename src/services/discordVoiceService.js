// Service to fetch leadership voice channel users via external bot API
// Configure the following env vars:
// - BOT_API_BASE_URL (e.g., https://your-bot.example.com)
// - BOT_API_LEADERSHIP_VOICE_PATH (optional; default: /voice/leadership/users)
// - BOT_API_TOKEN (optional; if provided, added as Authorization: Bearer <token>)

const axios = require('axios');

// Track speaking flags locally, keyed by Discord userId (if provided)
const speakingMap = new Map(); // userId -> boolean

function initDiscordVoiceTracking() {
  // No-op in the bot-API model; kept for compatibility with server.js
  return { usingBotApi: true };
}

async function getLeadershipUsers() {
  const base = process.env.BOT_API_BASE_URL;
  const path = process.env.BOT_API_LEADERSHIP_VOICE_PATH || '/voice/leadership/users';
  if (!base) {
    // Cannot fetch; return empty list gracefully
    return [];
  }
  const url = `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
  const headers = {};
  if (process.env.BOT_API_TOKEN) headers['Authorization'] = `Bearer ${process.env.BOT_API_TOKEN}`;
  try {
    const { data } = await axios.get(url, { headers, timeout: 5000 });
    // Expecting an array of users like [{ id, username, avatar }]
    if (Array.isArray(data)) {
      return data.map(u => ({ ...u, speaking: !!speakingMap.get(u.id) }));
    }
    if (Array.isArray(data?.users)) {
      return data.users.map(u => ({ ...u, speaking: !!speakingMap.get(u.id) }));
    }
    // Unknown shape; return empty for safety
    return [];
  } catch (e) {
    console.error('[discordVoiceService] Bot API fetch failed:', e.message);
    return [];
  }
}

function markSpeaking(userId, isSpeaking) {
  if (!userId) return; // If client doesn't provide a Discord userId, we can't map here
  speakingMap.set(userId, !!isSpeaking);
}

module.exports = {
  initDiscordVoiceTracking,
  getLeadershipUsers,
  markSpeaking
};

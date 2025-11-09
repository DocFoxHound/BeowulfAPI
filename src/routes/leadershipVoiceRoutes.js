const express = require('express');
const router = express.Router();
const { getLeadershipUsers } = require('../services/discordVoiceService');

// Returns list of Discord users currently in the leadership voice channel (as seen by the bot)
router.get('/users', async (req, res) => {
  try {
    const users = getLeadershipUsers();
    res.json({ channelId: process.env.DISCORD_LEADERSHIP_VOICE_CHANNEL_ID || null, users });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Returns list of sockets currently connected to the leadership channel via Socket.IO
router.get('/presence', async (req, res) => {
  try {
    const io = req.app?.io; // server.js will attach io to app for access
    const nsp = io?.of('/voice');
    const roomId = process.env.VOICE_LEADERSHIP_ROOM_ID || 'leadership';
    const room = nsp?.adapter?.rooms?.get(roomId);
    const sockets = room ? Array.from(room) : [];
    res.json({ roomId, sockets });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

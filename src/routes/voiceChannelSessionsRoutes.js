const express = require('express');
const router = express.Router();
const VoiceChannelSessions = require('../controllers/voiceChannelSessionsController'); // Assuming you have a controller for handling voice channel sessions



// GET request for retrieving a list of all users
router.get('/', VoiceChannelSessions.getAllVoiceSessions);

router.get('/lasthour', VoiceChannelSessions.getAllVoiceSessionsLastHour);

router.get('/active', VoiceChannelSessions.getAllActiveVoiceSessions);

// GET request for sessions within a timeframe by user_id
router.get('/byusertimeframe', VoiceChannelSessions.getVoiceSessionsWithinTimeframeByUserId);

// GET request for sessions within a timeframe
router.get('/timeframe', VoiceChannelSessions.getVoiceSessionsWithinTimeframe);

router.post('/', VoiceChannelSessions.createVoiceSession);

router.put('/:id', VoiceChannelSessions.updateVoiceSession);

router.delete('/:id', VoiceChannelSessions.deleteVoiceSession);

module.exports = router;

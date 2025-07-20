const express = require('express');
const router = express.Router();
const VoiceChannelSessions = require('../controllers/voiceChannelSessionsController'); // Assuming you have a controller for handling voice channel sessions

// GET request for retrieving a list of all users
router.get('/', VoiceChannelSessions.getAllVoiceSessions);

router.get('/active', VoiceChannelSessions.getAllActiveVoiceSessions);

router.post('/', VoiceChannelSessions.createVoiceSession);

router.put('/:id', VoiceChannelSessions.updateVoiceSession);

router.delete('/:id', VoiceChannelSessions.deleteVoiceSession);


module.exports = router;

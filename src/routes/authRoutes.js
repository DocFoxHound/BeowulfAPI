const express = require('express');
const passport = require('../auth/discord');
const handlers = require('../controllers/authController');

const router = express.Router();

// Start Discord OAuth
router.get('/discord', passport.authenticate('discord'));

// OAuth callback
router.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  handlers.handleDiscordCallback
);

// Get current user
router.get('/user', handlers.getUserProfile);

// Logout
router.get('/logout', handlers.logout);

module.exports = router;

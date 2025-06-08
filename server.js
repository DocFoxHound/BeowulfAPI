// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require("express-session");
const cors = require("cors");
const passport = require("./src/auth/discord");
const authRoutes = require('./src/routes/authRoutes');

// Import route files
const classRoutes = require("./src/routes/classRoutes")
const userRoutes = require('./src/routes/userRoutes');
const queueRoutes = require('./src/routes/queueRoutes');
const rankRoutes = require("./src/routes/rankRolesRoutes")
const prestigeRoutes = require("./src/routes/prestigeRolesRoutes")
const completedEntryRoutes = require("./src/routes/completedQueueRoutes")
const badgeRoutes = require("./src/routes/badgeRoutes")
const uexRoutes = require("./src/routes/uexRoutes")
const threadRoutes = require('./src/routes/threadRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const blackBoxRoutes = require('./src/routes/blackBoxRoutes');
const hitTrackRoutes = require('./src/routes/hitTrackerRoutes');
const shipLogRoutes = require('./src/routes/shipLogRoutes');
const gameVersionRoutes = require('./src/routes/gameVersionRoutes');
const lessonsLearnedRoutes = require('./src/routes/lessonLearnedRoutes')
const playerShipRoutes = require('./src/routes/playerShipRoutes')
const warehouseRoutes = require('./src/routes/warehouseRoutes')
const keyRoutes = require('./src/routes/keyRoutes');
const reportKill = require('./src/routes/reportKillRoutes')
const scheduleRoutes = require('./src/routes/scheduleRoutes')
const fleetRoutes = require('./src/routes/userFleetRoutes')
const playerExperienceRoutes = require('./src/routes/playerExperienceRoutes')
const recentGatheringRoutes = require('./src/routes/recentGatheringsRoutes')
const leaderboardSBRoutes = require('./src/routes/leaderboardSBRoutes');
const leaderboardSBSummaryRoutes = require('./src/routes/leaderboardSBSummaryRoutes');
const leaderboardPiracySummaryRoutes = require('./src/routes/leaderboardPiracySummaryRoutes');

// Load environment variables
dotenv.config();
// Create an Express application
const app = express();

// Middleware
app.use(morgan('dev'));               // Logging middleware
app.use(bodyParser.json());           // Parses JSON data in requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

// CORS so frontend can use cookies/session
app.use(cors({
    origin: [process.env.IS_LIVE === "true" ? process.env.LIVE_FRONTEND_URL : process.env.TEST_FRONTEND_URL, process.env.LIVE_FRONTEND_URL_SHORT],
    credentials: true
}));
  
// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(process.env.API_CLASS_ROUTES, classRoutes);
app.use(process.env.API_RANK_ROUTES, rankRoutes);
app.use(process.env.API_PRESTIGE_ROUTES, prestigeRoutes);
app.use(process.env.API_USER_ROUTES, userRoutes);
app.use(process.env.API_COMPLETED_ENTRY_ROUTES, completedEntryRoutes);
app.use(process.env.API_QUEUE_ROUTES, queueRoutes);
app.use(process.env.API_BADGES_ROUTES, badgeRoutes)
app.use(process.env.API_UEX_ROUTES, uexRoutes)
app.use(process.env.API_THREADS_ROUTES, threadRoutes);
app.use(process.env.API_MESSAGES_ROUTES, messageRoutes)
app.use(process.env.API_BLACKBOX_ROUTES, blackBoxRoutes)
app.use(process.env.API_HITTRACKER_ROUTES, hitTrackRoutes)
app.use(process.env.API_SHIPLOG_ROUTES, shipLogRoutes)
app.use(process.env.API_GAMEVERSION_ROUTES, gameVersionRoutes)
app.use(process.env.API_LESSONSLEARNED_ROUTES, lessonsLearnedRoutes)
app.use(process.env.API_PLAYERSHIP_ROUTES, playerShipRoutes)
app.use(process.env.API_WAREHOUSE_ROUTES, warehouseRoutes)
app.use(process.env.API_KEY_ROUTES, keyRoutes)
app.use(process.env.API_REPORT_KILL, reportKill)
app.use(process.env.API_SCHEDULES, scheduleRoutes)
app.use(process.env.API_FLEET_ROUTES, fleetRoutes)
app.use(process.env.API_PLAYER_EXPERIENCE_ROUTES, playerExperienceRoutes)
app.use(process.env.API_RECENT_GATHERINGS_ROUTES, recentGatheringRoutes)
app.use(process.env.API_EVENTS_ROUTES, scheduleRoutes)
app.use(process.env.API_LEADERBOARD_SB_ROUTES, leaderboardSBRoutes)
app.use(process.env.API_LEADERBOARD_SB_SUMMARY_ROUTES, leaderboardSBSummaryRoutes)
app.use(process.env.API_LEADERBOARD_PIRACY_SUMMARY_ROUTES, leaderboardPiracySummaryRoutes)
app.use('/auth', authRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


// Set the port and start the server
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
    console.log(`Server running on port http://${host}:${port}`);
});

// app.listen(3000, () => console.log("API listening on http://localhost:3000"));

// Export the app for testing purposes
module.exports = app;

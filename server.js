// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Import route files
const classRoutes = require("./src/routes/classRoutes")
const userRoutes = require('./src/routes/userRoutes');
const queueRoutes = require('./src/routes/queueRoutes');
const rankRoutes = require("./src/routes/rankRolesRoutes")
const prestigeRoutes = require("./src/routes/prestigeRolesRoutes")
const completedEntryRoutes = require("./src/routes/completedQueueRoutes")
const badgeRoutes = require("./src/routes/badgeRoutes")

// Load environment variables
dotenv.config();
// Create an Express application
const app = express();

// Middleware
app.use(morgan('dev'));               // Logging middleware
app.use(bodyParser.json());           // Parses JSON data in requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/api/class', classRoutes);
app.use('/api/ranks', rankRoutes);
app.use('/api/prestiges', prestigeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/completedentry', completedEntryRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/badges', badgeRoutes)

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Export the app for testing purposes
module.exports = app;
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',  // Specify using PostgreSQL
    port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
    // logging: console.log,  // Toggle logging SQL statements
    dialectOptions: {
        ssl: {
            require: process.env.DB_SSL === 'true',  // Require SSL if the environment variable is set to true
            rejectUnauthorized: false  // Do not block connection if SSL cert cannot be validated; adjust as necessary for security policies
        }
    },
    pool: {
        max: 5,  // Maximum number of connections in pool
        min: 0,  // Minimum number of connections in pool
        acquire: 30000,  // Maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000  // Maximum time, in milliseconds, that a connection can be idle before being released
    },
    define: {
        timestamps: false  // Do not automatically add timestamp fields (createdAt, updatedAt)
    }
});

// Authenticate and log the result
sequelize.authenticate()
    .then(() => console.log('Connection to PostgreSQL has been established successfully.'))
    .catch(err => console.error('Unable to connect to the PostgreSQL database:', err));

module.exports = sequelize;

# BeowulfAPI

## Project Overview
BeowulfAPI is a RESTful API built with Node.js and Express, designed to manage player tracking data for a gaming application. It utilizes PostgreSQL as the database and Sequelize as the ORM for database interactions.

## Features
- User authentication and authorization
- Player tracking with detailed information
- CRUD operations for player trackers
- CORS support for cross-origin requests
- Environment variable management using dotenv

## File Structure
```
BeowulfAPI
├── src
│   ├── controllers
│   │   └── playerTrackerController.js
│   ├── models
│   │   └── playerTrackerModel.js
│   └── routes
│       └── playerTrackerRoutes.js
├── server.js
├── .env
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd BeowulfAPI
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory and configure the environment variables. Refer to the `.env` file for the required variables.
2. Ensure PostgreSQL is installed and running, and create a database for the application.

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:3000`.

## API Endpoints
### Player Tracker Routes
- `GET /api/playertrackers` - Retrieve all player trackers
- `GET /api/playertrackers/:id` - Retrieve a player tracker by ID
- `POST /api/playertrackers` - Create a new player tracker
- `PUT /api/playertrackers/:id` - Update an existing player tracker
- `DELETE /api/playertrackers/:id` - Delete a player tracker by ID

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
require("dotenv").config(); // Load environment variables

const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.IS_LIVE === "false" ? process.env.TEST_DISCORD_CALLBACK_URL : process.env.LIVE_DISCORD_CALLBACK_URL,
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Optional: Save user to DB
      return done(null, profile);
    }
  )
);

module.exports = passport;
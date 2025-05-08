const UserModel = require('../models/userModel');

/**
 * Upserts a user record in the database based on Discord profile and auth info.
 * @param {Object} profile - Discord profile object from passport.
 * @param {Object} authInfo - Authentication info containing accessToken and refreshToken.
 * @returns {Promise<Object>} - The upserted or updated user instance.
 */
async function upsertUser(profile) {
  const { id: id, username } = profile;

  const [user] = await UserModel.upsert(
    {
      id,
      username,
      // accessToken: authInfo.accessToken,
      // refreshToken: authInfo.refreshToken,
    },
    { returning: true }
  );

  return user;
}

module.exports = { upsertUser };
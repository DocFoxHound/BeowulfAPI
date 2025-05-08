const UserService = require('../services/userService');

exports.handleDiscordCallback = async (req, res) => {
  const user = await UserService.upsertUser(req.user);
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

exports.getUserProfile = (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not logged in' });
  res.json(req.user);
};

exports.logout = (req, res) => {
  req.logout(() => res.redirect(process.env.FRONTEND_URL));
};

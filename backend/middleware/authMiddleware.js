const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

module.exports = async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: 'Not authenticated' });

    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ msg: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

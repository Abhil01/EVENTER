const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

// POST /auth/register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    // auto-login
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
        maxAge: 86400000
      })
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
        maxAge: 86400000
      })
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /auth/logout
exports.logout = (req, res) => {
  res
    .clearCookie('token', { httpOnly: true, sameSite: 'none', secure: false })
    .json({ msg: 'Logged out' });
};

// GET /auth/me
exports.me = (req, res) => {
  res.json(req.user);
};

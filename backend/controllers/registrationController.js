const Registration = require('../models/Registration');

// POST /registrations
exports.register = async (req, res) => {
  const { eventId } = req.body;
  const exists = await Registration.findOne({
    user:  req.user._id,
    event: eventId
  });
  if (exists) return res.status(400).json({ msg: 'Already registered' });

  const reg = await Registration.create({
    user:  req.user._id,
    event: eventId
  });
  res.status(201).json(reg);
};

// GET /registrations/mine
exports.getMine = async (req, res) => {
  const regs = await Registration.find({ user: req.user._id }).populate('event');
  res.json(regs);
};

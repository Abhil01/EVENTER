const Event = require('../models/Event');

// GET /events
exports.getAll = async (req, res) => {
  const events = await Event.find().sort('date');
  res.json(events);
};

// GET /events/:id
exports.getOne = async (req, res) => {
  const evt = await Event.findById(req.params.id);
  if (!evt) return res.status(404).json({ msg: 'Event not found' });
  res.json(evt);
};

// POST /events
exports.create = async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  const evt = await Event.create(payload);
  res.status(201).json(evt);
};

// PUT /events/:id
exports.update = async (req, res) => {
  const evt = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!evt) return res.status(404).json({ msg: 'Event not found' });
  res.json(evt);
};

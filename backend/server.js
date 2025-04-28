require('dotenv').config();
const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const connectDB    = require('./config/db');

const authRoutes         = require('./routes/authRoutes');
const eventRoutes        = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const { PORT, CLIENT_URL } = process.env;
const app = express();

// connect to DB
connectDB();

// middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

// mount routes
app.use('/auth',          authRoutes);
app.use('/events',        eventRoutes);
app.use('/registrations', registrationRoutes);

// error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something broke!' });
});

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

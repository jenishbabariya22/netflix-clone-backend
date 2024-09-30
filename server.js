const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'your-hardcoded-mongo-uri-here';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

console.log('Mongo URI:', MONGO_URI); // Debugging: Check if MONGO_URI is loaded correctly

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.get('/api/token', (req, res) => {
  const user = { id: 'user123' }; // Replace with actual user data in real application
  const token = jwt.sign({ user: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

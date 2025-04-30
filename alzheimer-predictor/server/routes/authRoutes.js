// server/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  
  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user to the database
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  return res.status(201).json({ message: 'User registered successfully.' });
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password.' });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

  return res.json({ message: 'Login successful', token });
});

module.exports = router;

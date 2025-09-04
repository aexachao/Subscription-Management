const express = require('express');
const { login, logout, checkAuth } = require('../controllers/authController');
const { requireGuest } = require('../middleware/auth');

const router = express.Router();

// Login route (POST)
router.post('/login', requireGuest, login);

// Logout route (POST)
router.post('/logout', logout);

// Check authentication status (GET)
router.get('/check', checkAuth);

module.exports = router;

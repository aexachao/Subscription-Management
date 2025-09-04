const session = require('express-session');

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// Initialize session middleware
const initSession = session(sessionConfig);

// Middleware to check if user is logged in
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Authentication required' });
    }
};

// Middleware to check if user is not logged in (for login page)
const requireGuest = (req, res, next) => {
    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Already logged in', user: req.session.user });
    } else {
        next();
    }
};

module.exports = {
    initSession,
    requireAuth,
    requireGuest
};

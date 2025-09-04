const sessionAuth = (req, res, next) => {
  // Check if user is authenticated via session
  if (req.session && req.session.userId) {
    return next();
  }
  
  // Check if it's a login request
  if (req.path === '/login' && req.method === 'POST') {
    return next();
  }
  
  // Check if it's a health check
  if (req.path === '/health') {
    return next();
  }
  
  // Unauthorized
  res.status(401).json({ 
    success: false, 
    message: 'Authentication required' 
  });
};

module.exports = {
  sessionAuth
};

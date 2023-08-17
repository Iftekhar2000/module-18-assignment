function authorizeUser(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authorization required' });
  }

  // Assuming user roles are stored in req.user.roles
  const userRoles = req.user.roles;

  // Check if the user has admin role
  if (userRoles.includes('admin')) {
    // Admins have access to CRUD blogs and comments
    return next();
  }

  // Check if the user has standard role
  if (userRoles.includes('standard')) {
    // Standard users have access to CRUD comments only
    if (req.originalUrl.includes('/comments')) {
      return next();
    }
  }

  // User does not have the required permissions
  res.status(403).json({ error: 'Insufficient permissions' });
}

module.exports = {
  authorizeUser
};
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log("token set>>>> line5");
  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    console.log("token split>>>> line 12 >>>>>> " + token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'my_secret_key'); // Use your JWT secret here
    req.user = decodedToken.user;
    console.log("token decoded >>>> line 15");
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  authenticateUser
};

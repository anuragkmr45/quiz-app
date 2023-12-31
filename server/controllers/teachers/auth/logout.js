const tokenBlacklist = new Set();

const logoutTeacherController = (req, res) => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', details: 'No token found' });
  }

  // Add the token to the blacklist
  tokenBlacklist.add(token);

  res.json({ message: 'Logout successful' });
};

const authenticateAndCheckBlacklistTeacher = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', details: 'No token found' });
  }

  // Check if the token is in the blacklist
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: 'Unauthorized', details: 'Token blacklisted' });
  }

  // Continue with the request
  next();
};

module.exports = {
    logoutTeacherController,
    authenticateAndCheckBlacklistTeacher,
};

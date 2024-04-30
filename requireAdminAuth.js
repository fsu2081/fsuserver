const jwt = require('jsonwebtoken');

const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Invalid Token' });
  }
};

module.exports = requireAdminAuth;

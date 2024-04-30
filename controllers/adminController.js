const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const adminDB = await Admin.findOne({ username });

  if (adminDB) {
    const isValid = await bcrypt.compare(password, adminDB.password);
    if (isValid) {
      console.log('Admin validated');
      const token = jwt.sign({ user: req.user }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '2h',
      });
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        secure: true,
        path: '/',
        sameSite: 'none',
      });

      adminDB.token = token;
      await adminDB.save();
      return res.status(200).json({
        status: 'success',
        data: adminDB,
      });
    } else {
      res.status(401).send({ status: 'error', message: 'Incorrect Password' });
    }
  } else {
    res.status(401).send({ status: 'error', message: 'Incorrect username' });
  }
};

const adminLogout = async (req, res) => {
  const token = req.cookies.token;
  res.clearCookie('token');

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

const isAdmin = async (req, res) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Invalid Token' });
  }
  return res.status(200).json({
    status: 'success',
  });
};

module.exports = { adminLogin, adminLogout, isAdmin };

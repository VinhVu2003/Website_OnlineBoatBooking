const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticate(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded; // Lưu thông tin người dùng vào request
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}

module.exports = authenticate;

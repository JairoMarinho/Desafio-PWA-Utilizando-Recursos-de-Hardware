const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const User = require('../models/platation.js');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extrair o token do cabeçalho
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

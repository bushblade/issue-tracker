const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      // its the second item in the array
      token = req.headers.authorization.split(' ')[1];
      // Verify the token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decode.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorised');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorised');
  }
});

module.exports = { protect };

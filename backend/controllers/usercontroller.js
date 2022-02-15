const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = (userid) => {
  return jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
};

// @desc   Register a new user
// @route  api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('please include all feilds! ');
  }
  // Check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User the same email exists!');
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  // Create user
  const user = await User.create({ name, email, password: hashedPass });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Login a new user
// @route  api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
});

// @desc   Get current users data
// @route  api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});
// const getMe = asyncHandler(async (req, res) => {
//   res.send('me');
// });

module.exports = { registerUser, loginUser, getMe };

const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
  expiresIn: "30d";
};

// @desc Register New User
// @route Get /api/users
// @access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Data is missing, Please fill all fields");
  }
  //   check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //   Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong Credentials/ Invalid Data");
  }
});
// @desc Login User
// @route Get /api/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc Get User Data
// @route Get /api/users/me
// @access private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email, orders } = await User.findById(
    req.user.id
  ).populate("orders");
  res.status(200).json({
    id: _id,
    name,
    email,
    orders,
  });
});
// channge user type to admin
// const makeAdmin = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   user.user_type = 1;
//   await user.save();
//   res.status(200).json({ "You've logged in as a Admin" });
// })

module.exports = {
  register,
  login,
  getMe,
};

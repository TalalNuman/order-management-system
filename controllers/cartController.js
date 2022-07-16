const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

const createCart = asyncHandler(async (req, res) => {
  const cart = await Cart.create({ ...req.body, userId: req.user.id });
  res.status(201).json({ cart });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({
    userId: req.user.id,
    _id: req.params.id,
  }).populate("cartItems");
  res.status(200).json({ cart });
});

const checkOut = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  const user = await User.findById(req.user.id);
  user.orders.unshift(cart._id);
  cart.isCheckedOut = true;
  await cart.save();
  await user.save();
  res.status(200).json({ cart });
});

module.exports = { createCart, getCart, checkOut };

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    voucher: "",
  });
  res.status(201).json({ user });
});
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});
const makeVoucher = asyncHandler(async (req, res) => {
  const { userId, voucher } = req.body;
  const user = await User.findById(userId);
  user.voucher = voucher;
  await user.save();
  res.status(200).json({ user });
});
const getDiscount = asyncHandler(async (req, res) => {
  const { userId, voucher_code, cartId } = req.body;
  const user = await User.findById(userId);
  const cart = await Cart.findById(cartId);
  if (user.voucher === voucher_code) {
    cart.items_total -= cart.items_total * 0.1;
    res.status(200).json({ message: "Discount has been granted", data: cart });
    user.voucher = "";
    cart.save();
    user.save();
  } else {
    res.status(200).json({ message: "Voucher is not valid" });
  }
});

module.exports = { createUser, getUsers, makeVoucher, getDiscount };

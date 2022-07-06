const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Voucher = require("../models/voucherModel");

const make_voucher = asyncHandler(async (req, res) => {
  const { userId, voucher } = req.body;
  const user = await User.find({ _id: userId, voucherRedeemed: false });
  user.voucher = voucher;
  await user.save();
  res.status(200).json({ user });
});

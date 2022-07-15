const asyncHandler = require("express-async-handler");

const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Voucher = require("../models/voucher.model");

const make_voucher = asyncHandler(async (req, res) => {
  const { userId, voucher_code, discount, expiry_date, cartId } = req.body;
  const user = await User.findById(userId);
  //   const cart = await Cart.find({ _id: cartId });
  const vouch = await Voucher.create({
    voucher_code,
    discount,
    cartId,
  });
  console.log(vouch);
  user.vouchers.push({ isRedeemed: 0, voucher: vouch });
  user.save();
  console.log(user.vouchers);

  res.status(200).json({ user });
});
const get_vouchers = asyncHandler(async (req, res) => {
  const vouchers = await Voucher.find();
  res.status(200).json({ vouchers });
});

const redeem_voucher = asyncHandler(async (req, res) => {
  const { userId, voucher_code } = req.body;
  const user = await User.findById(userId);
  const voucher = await Voucher.findOne({ voucher_code });
  if (voucher.isRedeemed === 0) {
    voucher.isRedeemed = 1;
    user.vouchers.push({ isRedeemed: 1, voucher: voucher });
    user.save();
    res.status(200).json({ user });
  } else {
    res.status(400).json({ message: "Voucher already redeemed" });
  }
});
const get_discount = asyncHandler(async (req, res) => {
  const { userId, cartId, voucher_code } = req.body;
  const user = await User.findById(userId).populate("vouchers.voucher");
  const cart = await Cart.findById(cartId);
  const vouchers = user.vouchers;
  let flag = 0;
  let discount = 0;
  vouchers.forEach((voucher) => {
    if (
      voucher.voucher.voucher_code === voucher_code &&
      voucher.isRedeemed === 0
    ) {
      discount = voucher.voucher.discount;
      let discount_total = (cart.items_total * discount) / 100;
      cart.items_total -= discount_total;
      cart.cart_total = cart.items_total + cart.VAT + cart.deliveryCharges;
      cart.save();
      voucher.isRedeemed = 1;
      user.save();
      flag = 1;
    } else if (
      voucher.voucher.voucher_code === voucher_code &&
      voucher.isRedeemed === 1
    ) {
      flag = 2;
    } else {
      flag = 3;
      // comparing dates using moment.js
      // const now = moment();\
      // const expiry = moment(voucher.voucher.expiry_date);
      // if (now.isAfter(expiry)) {
      //   voucher.isRedeemed = 2;
      //   user.save();
      //   flag = 2;
      // }
    }
  });
  if (flag === 1) {
    res.status(200).json({ user, cart });
  }
  if (flag === 2) {
    res.status(400).json({ message: "Voucher is already redeemed" });
  }
  if (flag === 3) {
    res.status(400).json({ message: "Voucher is expired" });
  }
});

module.exports = { make_voucher, get_vouchers, redeem_voucher, get_discount };

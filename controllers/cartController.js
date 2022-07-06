const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

const createCart = asyncHandler(async (req, res) => {
  const cart = await Cart.create(req.body);
  res.status(201).json({ cart });
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id).populate("cartItems");
  res.status(200).json({ cart });
});

module.exports = { createCart, getCart };

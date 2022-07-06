const asyncHandler = require("express-async-handler");
const CartItem = require("../models/cartItemModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const addToCart = asyncHandler(async (req, res) => {
  //   const { productId } = req.params;

  const product = await Product.findById(req.body.productId);
  const cart = await Cart.findById(req.body.cartId);
  const { productId, quantity, distance } = req.body;
  const cartItem = await CartItem.create({
    productId,
    quantity,
    cartId: req.body.cartId,
  });

  let deliveryCharges = distance < 20 ? 200 : distance * 10;
  let VAT = cart.items_total > 1000 ? product.price * quantity * 0.15 : 100;
  cart.VAT += VAT;
  product.inStock -= quantity;
  cart.deliveryCharges = deliveryCharges;
  cart.items_total += product.price * quantity;
  cart.cart_total =
    cart.items_total + product.price * quantity + VAT + deliveryCharges;
  await product.save();
  cart.cartItems.push(cartItem);
  await cart.save();

  res.status(201).json({ cartItem, cart });
});

const getCartItems = asyncHandler(async (req, res) => {
  //   const cartItems = await CartItem.find({ userId: req.user._id });
  const cartItems = await CartItem.find();
  res.status(200).json({
    cartItems,
  });
});

module.exports = { addToCart, getCartItems };

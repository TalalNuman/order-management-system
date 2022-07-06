const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Product = require("./productModel");
// Create Schema for CartItem
const CartItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", CartItemSchema);

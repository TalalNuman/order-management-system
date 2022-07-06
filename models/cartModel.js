const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");
const CartItem = require("./cartItemModel");

// Create Schema for Cart
const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "CartItem",
        required: true,
      },
    ],
    VAT: {
      type: Number,
      required: true,
    },
    deliveryCharges: {
      type: Number,
      required: true,
    },
    items_total: {
      type: Number,
      required: true,
    },
    cart_total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

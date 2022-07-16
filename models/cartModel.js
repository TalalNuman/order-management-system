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
      default: 0,
    },
    deliveryCharges: {
      type: Number,
      default: 0,
    },
    items_total: {
      type: Number,
      default: 0,
    },
    cart_total: {
      type: Number,
      default: 0,
    },
    isCheckedOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

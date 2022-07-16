const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = require("./cartModel");

// user model
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    vouchers: [
      {
        isRedeemed: { type: Number, default: 0 },
        voucher: {
          type: Schema.Types.ObjectId,
          ref: "Voucher",
          required: true,
        },
      },
    ],

    user_type: {
      type: Number,
      default: 0,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);

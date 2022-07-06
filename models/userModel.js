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
        // 0 - voucher is valid
        // 1 - voucher is used
        // 2 - voucher is expired
        isRedeemed: { type: Number, default: 0 },
        voucher: {
          type: Schema.Types.ObjectId,
          ref: "Voucher",
          required: true,
        },
      },
    ],

    // orders: [{
    //   type: String,
    //   required: true,
    // }],
    // cart: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Cart",
    //     required: true,
    //   },
    // ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");
const Cart = require("./cartModel");

const voucherSchema = new Schema({
  voucher_code: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
});
module.exports = mongoose.model("Voucher", voucherSchema);

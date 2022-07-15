const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");
const Cart = require("./cartModel");

const voucherSchema = new Schema({
  voucher_code: {
    type: String,
    unique: true,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiry_date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model("Voucher", voucherSchema);

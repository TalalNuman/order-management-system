const express = require("express");
const router = express.Router();
const {
  make_voucher,
  get_vouchers,
  get_discount,
} = require("../controllers/voucher.controller");

router
  .post("/", make_voucher)
  .get("/", get_vouchers)
  .post("/discount", get_discount);

module.exports = router;

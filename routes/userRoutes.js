const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  makeVoucher,
  getDiscount,
} = require("../controllers/userController");

router.post("/", createUser).get("/", getUsers);
router.post("/make_voucher", makeVoucher).post("/get_discount", getDiscount);

module.exports = router;

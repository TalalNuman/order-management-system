const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  checkOut,
} = require("../controllers/cartController");
const { auth } = require("../middlewares/auth.middleware");

router
  .post("/", auth, createCart)
  .get("/:id", auth, getCart)
  .post("/checkout/:id", auth, checkOut);

module.exports = router;

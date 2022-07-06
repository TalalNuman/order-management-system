const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
} = require("../controllers/cartItemController");

router.post("/", addToCart).get("/", getCartItems);

module.exports = router;

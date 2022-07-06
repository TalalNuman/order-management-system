const express = require("express");
const router = express.Router();
const { createCart, getCart } = require("../controllers/cartController");

router.post("/", createCart).get("/:id", getCart);

module.exports = router;

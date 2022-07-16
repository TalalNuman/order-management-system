const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/userController");
const { auth } = require("../middlewares/auth.middleware");

router
  .post("/login", login)
  .post("/register", register)
  .get("/getMe", auth, getMe);

module.exports = router;

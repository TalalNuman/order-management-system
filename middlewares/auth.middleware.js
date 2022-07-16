const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // GEt token from header
      token = req.headers.authorization.split(" ")[1];

      // verify TOken
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get User from the TOken
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authoriezed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no Token");
  }
});
module.exports = { auth };

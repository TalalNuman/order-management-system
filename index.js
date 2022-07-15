const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart_items", require("./routes/cartItemRoutes"));
app.use("/api/cart", require("./routes/CartRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/voucher", require("./routes/voucher.routes"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

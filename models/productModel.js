const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A Product Model
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

const mongoose = require("mongoose");
const MovieSchema = require("./movieModel.js");
const OrderSchema = require("./orderModel.js");

// TODO: add movies and orders arrays to schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: {
    type: Array,
    default: [MovieSchema],
  },
  orders: {
    type: Array,
    default: [OrderSchema],
  },
});

module.exports = mongoose.model("users", userSchema);

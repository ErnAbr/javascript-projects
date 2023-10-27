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
    // type: [MovieSchema], <-should be like this
    // default: [],
  },
  orders: {
    type: Array,
    default: [OrderSchema],
    // type: [OrderSchema], <-should be like this
    // default: [],
  },
});

module.exports = mongoose.model("users", userSchema);

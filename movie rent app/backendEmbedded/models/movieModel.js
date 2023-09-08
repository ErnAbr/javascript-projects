const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Available",
  },
});

module.exports = MovieSchema;

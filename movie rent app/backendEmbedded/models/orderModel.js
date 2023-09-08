const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
    default: "Rented",
  },
});

module.exports = OrderSchema;

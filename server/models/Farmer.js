const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true, // Each phone is a unique primary key
    index: true, // Faster lookups
  },
  name: {
    type: String,
    default: "", // User can update after login
  },
  age: {
    type: Number,
    default: null, // User can update after login
    min: 0,
    max: 120,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", ""],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Farmer", farmerSchema);

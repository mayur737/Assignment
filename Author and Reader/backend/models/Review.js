const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  reader: { type: mongoose.Schema.Types.ObjectId, ref: "Reader", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);

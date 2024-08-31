const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  publishDate: { type: Date },
  price: { type: Number },
  tags: [String],
  cover: { type: String }, // URL or path to the cover image
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Book", bookSchema);

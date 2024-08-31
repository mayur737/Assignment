const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

module.exports = mongoose.model("Author", authorSchema);

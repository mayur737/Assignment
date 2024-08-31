const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Author = require("../models/Author");
const Reader = require("../models/Reader");

// Register Author
exports.registerAuthor = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const author = new Author({ name, email, password: hashedPassword });

    await author.save();
    // Send verification email
    // Generate token
    const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Send email code here using nodemailer

    res.status(201).json({ message: "Author registered. Please check your email to verify." });
  } catch (error) {
    res.status(500).json({ message: "Error registering author", error });
  }
};

// Other auth controllers...

const Book = require("../models/Book");
const Review = require("../models/Review");
const mongoose = require("mongoose");

// Add a new book
exports.addBook = async (req, res) => {
  const { title, description, genre, publishDate, price, tags, cover, status } = req.body;
  const authorId = req.user.id; // Assume req.user is populated by middleware with decoded JWT

  try {
    const newBook = new Book({
      author: authorId,
      title,
      description,
      genre,
      publishDate,
      price,
      tags,
      cover,
      status,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
};

// Edit a book
exports.editBook = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const authorId = req.user.id;

  try {
    const book = await Book.findOneAndUpdate({ _id: id, author: authorId }, updates, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found or unauthorized" });
    res.json({ message: "Book updated successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Get author's books with search, filter, sort, pagination
exports.getAuthorBooks = async (req, res) => {
  const authorId = req.user.id;
  const { search, status, genre, sortBy, page = 1, limit = 10 } = req.query;

  try {
    const query = { author: authorId };
    if (search) query.title = new RegExp(search, "i");
    if (status) query.status = status;
    if (genre) query.genre = genre;

    const books = await Book.find(query)
      .sort(sortBy ? { [sortBy]: -1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

// Get reviews for an author's books
exports.getAuthorReviews = async (req, res) => {
  const authorId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const books = await Book.find({ author: authorId });
    const bookIds = books.map((book) => book._id);

    const reviews = await Review.find({ book: { $in: bookIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("reader", "name");

    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

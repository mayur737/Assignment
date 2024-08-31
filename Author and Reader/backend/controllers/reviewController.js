const Review = require("../models/Review");
const Book = require("../models/Book");

// Submit a review for a book
exports.submitReview = async (req, res) => {
  const { id: bookId } = req.params;
  const { rating, message } = req.body;
  const readerId = req.user.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const newReview = new Review({
      book: bookId,
      reader: readerId,
      rating,
      message,
    });

    await newReview.save();
    book.reviews.push(newReview._id);
    await book.save();

    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
};

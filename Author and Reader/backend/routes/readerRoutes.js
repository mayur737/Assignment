const express = require("express");
const { submitReview } = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/books/:id/reviews", auth, submitReview);

module.exports = router;

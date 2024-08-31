
const express = require("express");
const { addBook, editBook, getAuthorBooks, getAuthorReviews } = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", auth, addBook);
router.put("/:id", auth, editBook);
router.get("/", auth, getAuthorBooks);
router.get("/reviews", auth, getAuthorReviews);

module.exports = router;

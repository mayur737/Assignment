const express = require("express");
const { registerAuthor } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerAuthor);
// Additional routes for author login, book management...

module.exports = router;

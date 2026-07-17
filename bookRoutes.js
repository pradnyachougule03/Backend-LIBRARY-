const express = require("express");

const router = express.Router();

const {
  addBook,
  addMultipleBooks,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Admin Routes
router.post("/bulk", auth, admin, addMultipleBooks);// Add multiple books
router.post("/", auth, admin, addBook);              // Add single book
router.put("/:id", auth, admin, updateBook);
router.delete("/:id", auth, admin, deleteBook);

// User/Public Routes
router.get("/", auth, getBooks);
router.get("/:id", auth, getBook);

module.exports = router;
const Book = require("../models/Book");


// Add Single Book
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, isbn, quantity } = req.body;

    const bookExists = await Book.findOne({ isbn });

    if (bookExists) {
      return res.status(400).json({
        message: "Book already exists",
      });
    }

    const book = await Book.create({
      title,
      author,
      category,
      isbn,
      quantity,
    });

    res.status(201).json(book);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Add Multiple Books
exports.addMultipleBooks = async (req, res) => {
  try {
    const books = req.body;

    if (!Array.isArray(books)) {
      return res.status(400).json({
        message: "Request body must be an array of books.",
      });
    }

    const isbns = books.map((book) => book.isbn);

    const existingBooks = await Book.find({
      isbn: { $in: isbns },
    });

    if (existingBooks.length > 0) {
      return res.status(400).json({
        message: "Some books already exist.",
        existing: existingBooks.map((book) => book.isbn),
      });
    }

    const savedBooks = await Book.insertMany(books);

    res.status(201).json({
      message: "Books added successfully.",
      data: savedBooks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Single Book
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        category: req.body.category,
        quantity: req.body.quantity
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );


    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }


    res.status(200).json({
      message: "Book updated successfully",
      data: book
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Delete Book
exports.deleteBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndDelete(req.params.id);


    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }


    res.status(200).json({
      message: "Book Deleted Successfully"
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
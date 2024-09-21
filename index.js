const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const cors = require('cors');

const { getAllBooks, getBookById } = require('./controllers');
app.use(cors());
app.use(express.json());

// Endpoint to get all books
app.get('/books', async (req, res) => {
  try {
    const books = getAllBooks();
    if (books.length === 0) {
      res.status(400).json('No book details found');
    }
    res.status(200).json({ books });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get book detalls by id
app.get('/books/details/:id', async (req, res) => {
  try {
    let book = getBookById(parseInt(req.params.id));
    if (book.length === 0) {
      res.status(400).json('No book detail found by this id');
    }
    res.status(200).json({
      book,
    });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };

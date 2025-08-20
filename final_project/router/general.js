const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    // Check if user already exists
    const exists = users.some(u => u.username === username);
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }
  
    // Save new user
    users.push({ username, password });
  
    return res.status(201).json({ message: "User successfully registered. You can now log in." });
  });
  
  module.exports.general = public_users;

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // "books" should already be imported from booksdb.js
  return res.send(JSON.stringify(books, null, 4)); // Pretty prints JSON with 4 spaces
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    if (books[isbn]) {
      return res.send(JSON.stringify(books[isbn], null, 4)); // Pretty JSON
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let matchingBooks = [];
  
    // Iterate through all book keys
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        matchingBooks.push({ isbn: key, ...books[key] });
      }
    });
  
    if (matchingBooks.length > 0) {
      return res.send(JSON.stringify(matchingBooks, null, 4));
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  });
  

// Get book details based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let matchingBooks = [];
  
    // Iterate through all book keys
    let keys = Object.keys(books);
    keys.forEach((key) => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        matchingBooks.push({ isbn: key, ...books[key] });
      }
    });
  
    if (matchingBooks.length > 0) {
      return res.send(JSON.stringify(matchingBooks, null, 4));
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  });
  

// Get reviews for a book by ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
  
    if (books[isbn]) {
      return res.send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  

module.exports.general = public_users;
module.exports.users = users;
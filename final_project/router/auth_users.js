const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
// Add or modify a book review
regd_users.put('/auth/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const review = req.query.review;   // review comes from query param ?review=NiceBook
  const username = req.session.authorization.username; // from session

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res.send(`The review for book with ISBN ${isbn} has been added/updated by user ${username}`);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

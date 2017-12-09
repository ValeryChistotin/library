const express = require('express'),
  router = express.Router();

let Book = require('../models/book');

router.route('/:id')
  .get((req, res) => {
    Book.findById(req.params.id, (err, book) => {
      res.render('book', { book: book });
    })
  })
  .post((req, res) => {
    let book = {};
    book.image = req.body.image;
    book.title = req.body.title;
    book.author = req.body.author;

    let query = {_id: req.params.id};
    Book.update(query, book, err => {
      if(err) throw err;
      else res.redirect('/');
    })
  })
  .delete((req, res) => {
    let query = {_id: req.params.id};
    Book.remove(query, err => {
      if(err) throw err;
      res.send('Success');
    })
  });

module.exports = router;
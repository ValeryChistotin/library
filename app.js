const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  port = 3000,
  app = express();

mongoose.connect('mongodb://localhost/library');
let db = mongoose.connection;

db.once('open', () => { console.log('Connected to MongoDB') });
db.on('error', err => { console.log(err) });

let Book = require('./models/book');

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/')
  .get((req, res) => {
    Book.find({}, (err, books) => {
      if(err) throw err;
      else res.render('index', { books: books });
    });
  })
  .post((req, res) => {
    let book = new Book;
    book.image = req.body.image;
    book.title = req.body.title;
    book.author = req.body.author;

    book.save(err => {
      if(err) throw err;
      else res.redirect('/');
    })
  });

app.route('/book/:id')
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

app.listen(port, () => { console.log('Listening on port ' + port + '...') });
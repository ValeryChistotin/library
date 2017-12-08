const mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
  image: { type: String },
  title: { type: String, required: true },
  author: { type: String, required: true }
});

let Book = module.exports = mongoose.model('Book', bookSchema);
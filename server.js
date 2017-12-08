const http = require('http'),
  routes = require('./routes'),
  port = 3000;

let server = http.createServer((req, res) => {
  var bookString = '',
    file = __dirname + '/routes/models/books.json';

  req.on('data', data => {
    bookString += data;
  });

  req.on('end', () => {
    routes.define(req, res, file);
  });
});

server.listen(port, 'localhost');
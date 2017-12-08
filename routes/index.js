const url = require('url'),
  pathGlobal = require('path'),
  fs = require('fs');

const define = (req, res, postData) => {
  const urlParsed = url.parse(req.url, true);
  let path = urlParsed.pathname,
    prePath = __dirname,
    filePath;

    // ===============
    //   JSON
    // ===============

    fs.readFile(postData, 'utf-8', (err, data) => {
      if(err) console.log(err);

      data = JSON.parse(data);

      if(path === '/file'){
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(data));
      }
    });

    if(/\./.test(path)){
      if(pathGlobal.extname(path) === '.css') res.writeHead(200, {'Content-Type': 'text/css'});
      if(pathGlobal.extname(path) === '.js') res.writeHead(200, {'Content-Type': 'application/javascript'});

      let readStream = fs.createReadStream(prePath + '/public' + path);
      readStream.pipe(res);
      return;
    }

    if(path === '/') filePath = prePath + '/views/index.html'
    else filePath = prePath + '/views' + path + '.html';

    fs.readFile(filePath, 'utf-8', (err, html) => {
      if(err){
        let noPath = prePath + '/views/err.html';
        fs.readFile(noPath, (err, html) => {
          if(!err){
            res.end(html);
          } else {
            let text = 'Actually Not Works';
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end(text);
          }
        })
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
      }
    });

}

exports.define = define;
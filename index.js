var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (req, res) {
  
  var uri = url.parse(req.url).pathname;
  console.log(uri);
  ext = path.extname(uri);
  if (ext == '') {
    uri += '.html';
  }
  filePath = './public' + uri 

  console.log('Incoming request to ' + req.url);
  console.log('Incoming request resolved to ' + filePath);
  

  if (req.url === '/favicon.ico') {
    return res.end();
  }
  
    fs.readFile(filePath, function (err, data) {
    if (err) throw err;
    console.log('ext is ' + ext);
    if (ext == '.css') {
      res.writeHead(200, {'Content-Type': 'text/css'});
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
    }
    res.write(data);
    res.end();

  });

  

  
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');




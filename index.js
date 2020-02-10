const http = require('http');
const url = require("url");
const fs = require("fs");
const lookup = require("mime-types").lookup;
const { PORT } = require('./config/keys');

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if (path == "") {
    path = "index.html";
  }
  console.log(`Requested path ${path} `);
  let file = __dirname + "/public/" + path;
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      res.end(content);
    }
  });
});

server.listen(PORT , () => {
  console.log(`Listening on port : ${PORT}`);
});
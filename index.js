const http = require('http');
const url = require("url");
const fs = require("fs");
const path = require('path');
const lookup = require("mime-types").lookup;
const { PORT } = require('./config/keys');

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let urlPath = parsedURL.path.replace(/^\/+|\/+$/g, "");
  if (urlPath == "") {
    urlPath = "index.html";
  }
  console.log(`Requested path ${path} `);
  if(urlPath != 'video') {
    let file = __dirname + "/public/" + urlPath;
    fs.readFile(file, (err, content) => {
      if (err) {
        console.log(`File Not Found ${file}`);
        res.writeHead(404);
        res.end();
      } else {
        console.log(`Returning ${urlPath}`);
        res.setHeader("X-Content-Type-Options", "nosniff");
        let mime = lookup(urlPath);
        res.writeHead(200, { "Content-type": mime });
        res.end(content);
      }
    });
  } else {
    const videoFile = path.resolve(__dirname ,'./assets/video.mp4');
    fs.stat(videoFile, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.writeHead(404);
        }
      res.end(err);
      }
      let range = req.headers.range;
      if (!range) {
       return res.writeHead(416);
      }
      let positions = range.replace(/bytes=/, "").split("-");
      let start = parseInt(positions[0], 10);
      let total = stats.size;
      let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      let chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      const stream = fs.createReadStream(videoFile, { start: start, end: end })
       .on("open", () => {
          stream.pipe(res);
        }).on("error", err => {
          res.end(err);
        });
    });
  }
 
});

require('./webSocketServer/wsServer')(server);

server.listen(PORT , () => {
  console.log(`Listening on port : ${PORT}`);
});
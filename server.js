const http = require('http');
const path = require('path');
const fs = require('fs');

const directory = {
  '/recipe/new': '/recipe/new.html',
  '/recipe/new.html': '/recipe/new.html',
  '/recipe/new.css': '/recipe/new.css',
  '/recipe/new.js': '/recipe/new.js'
};

function handleStaticFileRequest(url, res) {
  return new Promise((resolve, reject) => {
    if (res.writableEnded) {
      return resolve(null);
    }

    if (!directory[url.pathname] || !fs.existsSync(path.join(__dirname, directory[url.pathname]))) {
      resolve(null);
    }

    fs.readFile(path.join(__dirname, directory[url.pathname]), (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.statusMessage = err.message;
        res.end();
        reject(err);
      } else {
        res.write(data, () => {
          res.end();
          resolve(null);
        });
      }
    });
  });
}

function handleNotFound(res) {
  return () => new Promise((resolve) => {
    if (!res.writableEnded) {
      res.statusCode = 404;
      res.statusMessage = 'Resource not found!';
      res.end();
      return resolve();
    }
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  console.log(`Received "${req.method}" request on path "${url.pathname}"`);
  
  if(req.method === 'POST') {
    let rawPostData = "";
    req.on('data', (chunk) => {
      console.log(chunk);
      rawPostData += chunk
    });
    req.on('end', () => {
      console.log(rawPostData);
    });
  }

  return handleStaticFileRequest(url, res)
    .then(handleNotFound(res));
});

server.listen(8080, () => {
  console.log('Server started listening on port 8080');
});
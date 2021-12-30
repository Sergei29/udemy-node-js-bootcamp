const http = require("http");
const url = require("url");
const fs = require("fs");

const strData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const objData = JSON.parse(strData);

const PORT = process.env.PORT || 8000;
const server = http.createServer();

server.on("request", (req, res) => {
  const pathName = req.url;

  switch (pathName) {
    case "/":
    case "/overview":
      res
        .writeHead(200, "OK", {
          "Content-type": "text/html",
          "my-own-header": "hello world",
        })
        .write("<h1>Overview page</h1>");
      res.end();
      break;

    case "/product":
      res
        .writeHead(200, "OK", {
          "Content-type": "text/html",
        })
        .write("<h1>Product page</h1>");
      break;

    case "/api":
      res
        .writeHead(200, "OK", {
          "Content-type": "application/json",
        })
        .write(strData);
      res.end();
      break;

    default:
      res
        .writeHead(404, "Not Found", {
          "Content-type": "text/html",
        })
        .write("<h1>Page not found</h1>");
      break;
  }
});

server.on("error", (error) => {
  console.error("Server Error: ", error.name, " ", error.message);
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

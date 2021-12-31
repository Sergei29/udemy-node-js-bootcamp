const http = require("http");
const url = require("url");
const fs = require("fs");
const {
  arrProductsData,
  parseTemplate,
  parseTemplateOverview,
  strProductsData,
  strTemplateProduct,
} = require("./readTemplates");

const PORT = process.env.PORT || 8000;
const server = http.createServer();

server.on("request", (req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    // Overview Page:
    case "/":
    case "/overview":
      res
        .writeHead(200, "OK", {
          "Content-type": "text/html",
          "my-own-header": "hello world",
        })
        .write(parseTemplateOverview());
      res.end();
      break;

    // Product Page:
    case "/product":
      const intId = parseInt(query.id, 10);

      res
        .writeHead(200, "OK", {
          "Content-type": "text/html",
        })
        .write(parseTemplate(strTemplateProduct, arrProductsData[intId]));
      res.end();
      break;

    // API
    case "/api":
      res
        .writeHead(200, "OK", {
          "Content-type": "application/json",
        })
        .write(strProductsData);
      res.end();
      break;

    // Not found:
    default:
      res
        .writeHead(404, "Not Found", {
          "Content-type": "text/html",
        })
        .write("<h1>Page not found</h1>");
      res.end();
      break;
  }
});

server.on("error", (error) => {
  console.error("Server Error: ", error.name, " ", error.message);
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

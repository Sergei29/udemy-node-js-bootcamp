const fs = require("fs");
const server = require("http").createServer();
const PORT = process.env.PORT || 8000;

const handleError = (error) => {
  console.error(error.name, ". ", error.message);
  throw new Error(error.message);
};

server.on("request", (req, res) => {
  // Solution 1:
  // fs.readFile(`${__dirname}/test-file.txt`, "utf-8", (error, strData) => {
  //   if (!!error) return handleError(error);

  //   res
  //     .writeHead(200, "OK", {
  //       "Content-type": "text/html",
  //     })
  //     .write(strData);
  //   res.end();
  // });

  // Solution 2, Streams:
  // const readable = fs.createReadStream(`${__dirname}/test-file.txt`, {
  //   encoding: "utf-8",
  // });
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });

  // readable.on("error", (error) => {
  //   console.error(error.name, ". ", error.message);
  //   res.statusCode = 500;
  //   res.end("Error: Not found.");
  // });

  // Solution 3, Streams pipe():
  const readable = fs.createReadStream(`${__dirname}/test-file.txt`, {
    encoding: "utf-8",
  });

  readable.pipe(res);

  readable.on("error", (error) => {
    console.error(error.name, ". ", error.message);
    res.statusCode = 500;
    res.end("Error: Not found.");
  });
});

server.listen(PORT, () => {
  console.log(`server runnning at http://localhost:${PORT}`);
});

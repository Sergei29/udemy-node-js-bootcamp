const EventEmitter = require("events");
const http = require("http");

const server = http.createServer();
const PORT = process.env.PORT || 8000;

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", (...args) => {
  console.log("A new sale happened!", args);
});

myEmitter.on("newSale", (...args) => {
  console.log("Customer name: John Doe sale: ", ...args);
});

myEmitter.emit("newSale", 1, 2, 3);

server.on("request", (req, res) => {
  console.log("Request received.", req.url);
  res.end("Request received.");
});

server.on("request", (req, res) => {
  console.log("Request another.");
});

server.on("close", (req, res) => {
  console.log("Server closed");
});

server.listen(PORT, () => {
  console.log(`server runnning at http://localhost:${PORT}`);
});

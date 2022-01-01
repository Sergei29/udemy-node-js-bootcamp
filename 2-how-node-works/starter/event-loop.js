const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => {
  console.log("Timer 1 finished.");
}, 0);

setImmediate(() => {
  console.log("Immediate 1 finished.");
});

fs.readFile(`${__dirname}/test-file.txt`, "utf-8", (error, data) => {
  if (!!error) console.error("Error: ", error.name, ". ", error.message);

  console.log("I/O completed");
  console.log("-------------");

  setTimeout(() => {
    console.log("Timer 2 finished.");
  }, 0);

  setTimeout(() => {
    console.log("Timer 3 finished.");
  }, 3000);

  setImmediate(() => {
    console.log("Immediate 2 finished.");
  });

  process.nextTick(() => {
    console.log("Next tick 1 completed.");
  });

  crypto.pbkdf2("password1", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, " Password 1 encrypted");
  });
  crypto.pbkdf2("password2", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, " Password 2 encrypted");
  });
  crypto.pbkdf2("password3", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, " Password 3 encrypted");
  });
  crypto.pbkdf2("password4", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, " Password 4 encrypted");
  });
});

console.log("Top level code completed.");

const fs = require("fs");

// Synchronous blocking code:

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

const textOut = `This is what we know about the avocado: ${textIn}. \nCreated at: ${new Date()}`;

fs.writeFileSync("./txt/output.txt", textOut);

// async non-blocking code:

const handleError = (error) => {
  console.error(error.message);
  throw new Error(error.message);
};

fs.readFile(
  `${__dirname}/txt/start.txt`,
  { encoding: "utf-8" },
  (error1, data1) => {
    if (error1) return handleError(error1);
    fs.readFile(
      `${__dirname}/txt/${data1}.txt`,
      { encoding: "utf-8" },
      (error2, data2) => {
        if (error2) return handleError(error2);
        fs.readFile(
          `${__dirname}/txt/append.txt`,
          { encoding: "utf-8" },
          (error3, data3) => {
            if (error3) return handleError(error3);
            const strAggregated = `${data2}\n${data3}`;
            fs.writeFile(
              `${__dirname}/txt/final.txt`,
              strAggregated,
              { encoding: "utf-8" },
              (errorWrite) => {
                if (errorWrite) return handleError(errorWrite);
                console.log("File Written OK!");
              }
            );
          }
        );
      }
    );
  }
);

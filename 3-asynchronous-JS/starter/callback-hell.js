const fs = require("fs");
const superagent = require("superagent");

const getApiUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images/random`;

const handleError = (error) => {
  console.error(error.message);
};

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (error1, data1) => {
  if (!!error1) return handleError(error1);

  superagent.get(getApiUrl(data1)).end((error2, response) => {
    if (!!error2) return handleError(error2);

    fs.writeFile(
      `${__dirname}/output.txt`,
      response.body.message,
      { encoding: "utf-8" },
      (error3) => {
        if (!!error3) return handleError(error3);

        console.log("File written.");
      }
    );
  });
});

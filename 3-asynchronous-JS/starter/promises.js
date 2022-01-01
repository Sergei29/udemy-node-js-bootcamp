const fs = require("fs");
const superagent = require("superagent");

const getApiUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images/random`;

const handleError = (error) => {
  console.error(error.message);
};

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (error1, data1) => {
  if (!!error1) return handleError(error1);

  superagent
    .get(getApiUrl(data1))
    .then((response) => response.body.message)
    .then((imageUrl) =>
      fs.writeFile(
        `${__dirname}/output.txt`,
        imageUrl,
        { encoding: "utf-8" },
        (errorWrite) => {
          if (!!errorWrite) return handleError(errorWrite);

          console.log("File written.");
        }
      )
    )
    .catch(handleError);
});

const fs = require("fs");
const superagent = require("superagent");

const getApiUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images/random`;

const handleError = (error) => {
  console.error(error.message);
};

const readFilePro = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!!err) return reject("File not found.", err.message);
      return resolve(data);
    });
  });

const writeFilePro = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, { encoding: "utf-8" }, (err) => {
      if (!!err) return reject("Failed to write.", err.message);
      return resolve();
    });
  });

readFilePro(`${__dirname}/dog.txt`)
  .then((breedName) => superagent.get(getApiUrl(breedName)))
  .then((response) => response.body.message)
  .then((imageUrl) => writeFilePro(`${__dirname}/output.txt`, imageUrl))
  .then(() => console.log("File written."))
  .catch(handleError);

module.exports = {
  getApiUrl,
  handleError,
  readFilePro,
  writeFilePro,
};

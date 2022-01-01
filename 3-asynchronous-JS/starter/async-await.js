const superagent = require("superagent");
const fs = require("fs");

const getApiUrl = (breed) => `https://dog.ceo/api/breed/${breed}/images/random`;

const readFilePro = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (!!err) return reject(new Error("File not found.", err.message));
      return resolve(data);
    });
  });

const writeFilePro = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, { encoding: "utf-8" }, (err) => {
      if (!!err) return reject(new Error("Failed to write.", err.message));
      return resolve();
    });
  });

const writeImageUrl = async () => {
  try {
    const strBreed = await readFilePro(`${__dirname}/dog.txt`);
    const response = await superagent.get(getApiUrl(strBreed));
    const strImageUrl = response.body.message;
    await writeFilePro(`${__dirname}/output.txt`, strImageUrl);
    console.log("File written - success.😀");
  } catch (error) {
    console.error(error.message);
  }
};

writeImageUrl();

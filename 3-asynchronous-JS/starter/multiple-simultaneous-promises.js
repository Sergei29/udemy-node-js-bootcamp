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

const getDogImagePromise = (breed) =>
  superagent.get(getApiUrl(breed)).then((response) => response.body.message);

const writeImageUrl = async () => {
  try {
    const strBreed = await readFilePro(`${__dirname}/dog.txt`);
    const arrImages = await Promise.all([
      getDogImagePromise(strBreed),
      getDogImagePromise(strBreed),
      getDogImagePromise(strBreed),
    ]);

    await writeFilePro(`${__dirname}/output.txt`, arrImages.join("\n"));
    console.log("File written - success.😀");
  } catch (error) {
    console.error(error.message);
  }
};

writeImageUrl();

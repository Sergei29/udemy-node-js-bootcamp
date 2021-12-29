const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

const textOut = `This is what we know about the avocado: ${textIn}. \nCreated at: ${new Date()}`;

fs.writeFileSync('./txt/output.txt', textOut);
const tesseract = require('node-tesseract');
const promisify = require('util').promisify;

const process = promisify(tesseract.process);

const read = (inputFile) => process(inputFile)
    .catch((err) => console.log(err));

module.exports = read;
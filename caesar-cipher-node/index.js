const fs = require('fs');
const { pipeline } = require('stream');

const createTransformStream = require('./create-transform-stream');
const getOptions = require('./get-options');
const getFilePath = require('./get-file-path');
const { handleReqiredOptions, handleFiles} = require('./handle-options');


const programOptions = getOptions();
const encodeMultiplier = programOptions.action === 'decode' ? -1 : 1;

handleReqiredOptions(programOptions);
handleFiles(programOptions)

const readStream = programOptions.input ?
  fs.createReadStream(getFilePath(programOptions.input)) : process.stdin;
const writeStream = programOptions.output ?
  fs.createWriteStream(getFilePath(programOptions.output), { flags:'a' }) : process.stdout;

var transformStream = createTransformStream((Number(programOptions.shift) % 26) * encodeMultiplier);

pipeline(
  readStream,
  transformStream,
  writeStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Encryption completed');
    }
  }
);


process.on('SIGINT', function() {
  console.log('\nEncryption completed');
  process.exit();
});


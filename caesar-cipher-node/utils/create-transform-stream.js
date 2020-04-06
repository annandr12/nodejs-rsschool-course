const stream = require('stream');
const { caesarCipher } = require('./ceasar-cipher');

const createTransformStream = shift => {
  return new stream.Transform({
    transform: (chunk, encoding, callback) => {
      const transformedChank = `${chunk
        .toString('utf8')
        .split('\n')
        .filter(line => line !== '')
        .map(line => caesarCipher(line, Number(shift)))
        .join('\n')}\n`;
      callback(false, transformedChank);
    }
  });
};

module.exports = createTransformStream;

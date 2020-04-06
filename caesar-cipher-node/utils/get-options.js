const { program } = require('commander');

module.exports = () => {
  program.storeOptionsAsProperties(false);
  program
    .option('-s, --shift <num>', 'a shift')
    .option('-i, --input <filename>', 'input file')
    .option('-o, --output <filename>', 'output file')
    .option('-a, --action <type>', 'action (encode or decode)');

  program.parse(process.argv);
  return program.opts();
};

const fs = require('fs');
const getFilePath = require('./get-file-path');
const displayErrorMessage = require('./display-error');

const handleReqiredOptions = ({ shift, action }) => {
  shift = Number(shift) % 26;
  if (!shift) {
    displayErrorMessage('Shift is not provided \n', 1);
  } else if(isNaN(shift) || !Number.isInteger(shift)) {
    displayErrorMessage('Shift must be an integer \n', 2);
  }
  
  if (!action) {
    displayErrorMessage('Action is not provided \n', 1);
  } else if (action !== 'encode' && action !== 'decode') {
    displayErrorMessage('Invalid parameter! Please use `encode` or `decode` for action parameter \n', 2);
  }
}

const handleFiles = ({ input, output }) => {
  if (input && !fs.existsSync(getFilePath(input))) {
    displayErrorMessage('Input file not found \n', 3);
  }
  if (output && !fs.existsSync(getFilePath(output))) {
    displayErrorMessage('Output file not found \n', 3);
  }
}

module.exports = {
  handleReqiredOptions,
  handleFiles
}
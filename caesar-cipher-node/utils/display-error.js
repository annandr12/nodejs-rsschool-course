const displayErrorMessage = (message, code) => {
  throw new Error(`${message}. Exited with code ${code}`);
};

module.exports = displayErrorMessage;

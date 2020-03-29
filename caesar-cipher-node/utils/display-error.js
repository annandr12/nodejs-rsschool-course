const displayErrorMessage = (message, code) => {
  process.stderr.write(message);
  process.exit(code);
}

module.exports = displayErrorMessage;
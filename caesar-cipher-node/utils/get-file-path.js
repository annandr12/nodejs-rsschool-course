
module.exports = (filename) => {
  const currentPath = process.cwd() + '/';
  return currentPath + filename;
}
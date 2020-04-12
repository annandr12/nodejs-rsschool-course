module.exports = (req, res, next) => {
  console.log('originalUrl:', req.originalUrl);
  console.log('query:', req.query);
  console.log('body:', req.body);
  next();
};

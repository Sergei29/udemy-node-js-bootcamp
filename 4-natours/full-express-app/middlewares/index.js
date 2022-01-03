const timeMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
};
const helloMiddleware = (req, res, next) => {
  console.log('Hello from middleware! 👋');
  next();
};

module.exports = {
  helloMiddleware,
  timeMiddleware,
};

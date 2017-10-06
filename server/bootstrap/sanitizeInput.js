const sanitize = require('mongo-sanitize');

module.exports = (app) => {
  app.use(function (req, res, next) {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
  });
};
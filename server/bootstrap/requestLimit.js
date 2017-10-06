const RateLimit = require('express-rate-limit');
const secret = require('../../secret');
const serverConfig = require('../config');

module.exports = (app) => {
  app.use(serverConfig.apiRoute, new RateLimit({
    windowMs: secret.limit.api.windowMs,
    max: secret.limit.api.max,
    delayMs: 0
  }));
};
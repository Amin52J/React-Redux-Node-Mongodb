const Router = require('react-router');
const routes = require('../../app/routes');
const reactCookie = require('react-cookie');
const ReactDOM = require('react-dom/server');
const React = require('react');
const fs = require('fs');
const Mustache = require('mustache');
const serverConfig = require('../config');

module.exports = (app) => {
  app.use(function (req, res) {
    Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
      reactCookie.plugToRequest(req, res);
      if (err) {
        res.status(500).send(err.message)
      } else if (redirectLocation) {
        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
        fs.readFile(serverConfig.indexRoute, function (err, data) {
          if (err) throw err;
          const page = Mustache.render(data.toString(), {html: html});
          res.status(200).send(page);
        });
      } else {
        res.status(404).send('Page Not Found')
      }
    });
  });
};
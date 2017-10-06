require('babel-core/register');

let React = require('react');
let ReactDOM = require('react-dom/server');
let Router = require('react-router');
let path = require('path');
let fs = require('fs');
let Mustache = require('mustache');

let mongoose = require('mongoose');
let express = require('express');
let session = require('express-session');
let logger = require('morgan');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let MongoStore = require('connect-mongo')(session);
let RateLimit = require('express-rate-limit');
let sanitize = require('mongo-sanitize');
let reload = require('reload');

let routes = require('../app/routes');
let Resources = require('../app/constants/resources').default;
let config = require('../config');
let secret = require('../secret');
let utils = require('./common/utils');

let cookieParser = require('cookie-parser');
let reactCookie = require('react-cookie');
let api = {
  root: require('./api/root')
};

mongoose.connect(config.database);
mongoose.connection.on('error', function () {
  console.info(Resources.errors.mongod);
});

let app = express();

app.set('port', process.env.PORT || 3000);

app.set('superSecret', secret.superSecret);

let apiRoutes = express.Router();

//limit the number of request
app.use('/api', new RateLimit({
  windowMs: secret.limit.api.windowMs,
  max: secret.limit.api.max,
  delayMs: 0
}));

//secure session and cookies
app.use(session({
    secret: secret.session.secret,
    name: secret.session.name,
    saveUninitialized: false, //don't start a session before anything is changed
    httpOnly: true, //only allow http[s] requests to access sessions
    resave: false, //don't save any session unless something is changed
    store: new MongoStore({ //where to save the sessions
      mongooseConnection: mongoose.connection, //database connection
      ttl: secret.session.ttl,
      touchAfter: secret.session.touchAfter
    })
  }
));

//sanitize input
app.use(function (req, res, next) {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
});

//to secure HTTP Headers
app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname.replace('/server', ''), 'public')));

app.use('/api', apiRoutes);

//------------------------------API-------------------------------------
/**
 * Test
 */
app.post(Resources.api.test, (req,res)=>{
  api.root.post.test(req,res,app.get('superSecret'));
});
//------------------------------End of API-------------------------------------

app.use(function (req, res) {
  Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
    reactCookie.plugToRequest(req, res);
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      let html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
      fs.readFile('views/index.html', function (err, data) {
        if (err) throw err;
        var page = Mustache.render(data.toString(), {html: html});
        res.status(200).send(page);
      });
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
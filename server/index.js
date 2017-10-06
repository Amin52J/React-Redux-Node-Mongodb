require('babel-core/register');

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const reload = require('reload');
const cookieParser = require('cookie-parser');

const config = require('../config');
const secret = require('../secret');
const utils = require('./common/utils');
const serverConfig = require('./config');

const database = require('./bootstrap/database');
const requestLimit = require('./bootstrap/requestLimit');
const secureSession = require('./bootstrap/secureSession');
const sanitizeInput = require('./bootstrap/sanitizeInput');
const routing = require('./bootstrap/routing');
const launch = require('./bootstrap/launch');
const api = require('./api');

//bootstrap database
const db = database();

const app = express();

app.set('port', process.env.PORT || serverConfig.port);
app.set('superSecret', secret.superSecret);

//limit the number of request
requestLimit(app);

//secure session and cookies
secureSession(app, db);

//sanitize input
sanitizeInput(app);

//secure HTTP Headers
app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname.replace(serverConfig.serverRoute, ''), serverConfig.publicRoute)));

const apiRoutes = express.Router();
app.use(serverConfig.apiRoute, apiRoutes);

//initialize the api
api(app);

//setup routing
routing(app);

//launch the server
launch(app);
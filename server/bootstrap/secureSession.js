const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const secret = require('../../secret');

module.exports = (app, db) => {
  app.use(session({
      secret: secret.session.secret,
      name: secret.session.name,
      saveUninitialized: false, //don't start a session before anything is changed
      httpOnly: true, //only allow http[s] requests to access sessions
      resave: false, //don't save any session unless something is changed
      store: new MongoStore({ //where to save the sessions
        mongooseConnection: db.connection, //database connection
        ttl: secret.session.ttl,
        touchAfter: secret.session.touchAfter
      })
    }
  ));
};
const express = require('express');
const colors = require('colors');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Controllers
const userController = require('./database/user-controller.js');
const scraperController = require('./database/scraper-controller.js');
const scraperDBController = require('./database/scraper-db-controller.js');

// Application variables
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_CALLBACK_URL } = require('../config/oauth.js');
const { COOKIE_KEY } = require('../config/keys.js');

const app = express();

scraperController.getData().then((data) => {
  scraperDBController.clearStocks();
  scraperDBController.postStocks(data);
}).catch(err => console.log(`Error: ${err.message}`.red));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: COOKIE_KEY,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userController.getUser(id, user => {
    done(null, user);
  })
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: OAUTH_CALLBACK_URL
},
  (accessToken, refreshToken, profile, cb) => {
    userController.getUser(profile.id, user => {
      if (user) {
        cb(null, user);
      } else {
        userController.postUser(profile.id, profile.displayName, profile._json.image.url, user => {
          cb(null, user);
        })
      }
    })
  }
));

app.get('/oauth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/stocks/update/:stock/:userid', userController.postUserStocks, (req, res) => {
  console.log('Stock added');
  res.end();
});

app.get('/auth', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');
  const config = Object.create(webpackConfig);

  config.devtool = 'eval-source-map';
  config.entry = [
    `webpack-hot-middleware/client?path=http://localhost:${SERVER_PORT}/__webpack_hmr`,
    './client/index.js'
  ];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: '/',
    stats: { colors: true }
  }));

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
  }));
} else {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}...`.green));

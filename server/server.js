const express = require('express');
const colors = require('colors');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const userController = require('./database/user-controller.js');
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_CALLBACK_URL } = require('../config/oauth.js');

const app = express();

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

app.use(passport.initialize());
app.use(passport.session());

//google oauth
// const googleClientId = '791754955490-65ovohdld1ug2u8qojpokfuk4sasg4td.apps.googleusercontent.com';
// const googleClientSecret = 'pWjBMyaP1esUQXTC6JUmqAGZ';
// const oauthCallbackURL = '/oauth/google/callback';

let userId;
let userName;
let userAvatar;
let userStocks = [];

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

app.get('/oauth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });





app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}...`.green));

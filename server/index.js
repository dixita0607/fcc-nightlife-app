const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const sweeper = require('./middlewares/sweeper');
const path = require('path');


// Mongoose
const mongoose = require('mongoose');
const {User} = require('./models/user');

mongoose.Promise = global.Promise;

// Passport
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackUrl: `${process.env.HOST}/api/twitter/auth`
}, (token, tokenSecret, profile, done) => {
  const username = profile.username;
  User.findOne({username})
    .then(user => {
      if (user) done(null, user);
      else User.create({username})
        .then(user => done(null, user))
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  User.findOne({username})
    .then(user => done(null, user))
    .catch(error => done(error));
});

// App
const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }),
  passport.initialize(),
  passport.session(),
  bodyParser.json()
);

app.use('/api', sweeper, require('./api'));

// Database connection
mongoose.connect(process.env.DB_URL, {useMongoClient: true})
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT || 8000);
  })
  .catch(error => console.log(error));

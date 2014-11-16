//All Requires
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var VenmoStrategy = require('passport-venmo').Strategy;
var Schema = mongoose.Schema;

var VenmoUserSchema = new Schema({
	venmoId: String
}, {collection: 'testData'});

// Setup the models
var UserModel = mongoose.model('User', VenmoUserSchema);
// Setup the schema
// Connect to DB
mongoose.connect(dbConfig.url);
// Create web server 'app' object
var app = express();
// Middleware chain
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Configuring Passport (Passport middleware)
app.use(expressSession({secret: 'mySecretKey'}));
passport.use(new VenmoStrategy({
    clientID: 2113,
    clientSecret: 'cTeBm56EGJ3zh6kKZR5kymsZpr8zPbxU',
    callbackURL: "http://okiru.cloudapp.net/"
  },
  function(accessToken, refreshToken, profile, done) {
    UserModel.findOrCreate({ VenmoId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
app.use(passport.initialize());
app.use(passport.session());
// Setup passport with database

passport.serializeUser(function(user, done) {
	console.log('serializing user:', user);
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	UserModel.findById(id, function(err, user) {
		console.log('deserializing user:', user);
		done(err, user);
	});
});
//Register web server routes
var routes = require('./routes/index')(app, passport);

app.listen(80, function(){
	console.log('Serve is listening on port 80');
});

	
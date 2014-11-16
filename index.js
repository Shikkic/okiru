var express = require('express');
var app = express();
app.use(express.static('public'));

var dataBase = require('./db.js');
var mongoose = require('mongoose');
moongose.connect(dataBase.url);

module.exports = mongoose.model('User',{
    venmoId: String,
	phone: String
});

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null,user._id);
});

passport.deserializeUser(function(user, done){
	User.findById(id,function(err, user){
		done(err, user);
	});
});

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

app.listen(80, function(){
	console.log('Serve is listening on port 80');
});

	
var path = require('path');
module.exports = function(app, passport){
	
	/* GET login page. */
	app.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
		if (req.isAuthenticated()) {
			return res.status(200).sendFile(path.join(__dirname, '..', 'public', 'setup.html'));
		} else {
			return res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
		}
	});
 
	/* Handle Login POST */
	app.get('/login', passport.authenticate('venmo', {
		scope: ['make_payments', 'access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
		successRedirect: '/',
		failureRedirect: '/'
	}));
  
	app.get('/auth/venmo', passport.authenticate('venmo'));
	app.get('/auth/venmo/callback', passport.authenticate('venmo', {
		failureRedirect: '/'
	}), function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	});
}
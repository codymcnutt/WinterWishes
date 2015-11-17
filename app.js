// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Characters')

// Auth Requires
var session = require('express-session');
var passport = require('passport');

var passportConfig = require('./config/passport'); // Load in our passport configuration that decides how passport actually runs and authenticates

// Create Express App Object \\
var app = express();

// Session Setup
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
var controller = require('./controllers/controller')

app.get('/', function(req, res){
  res.sendFile("/html/home.html", {root : './public'})
});

var authenticationController = require('./controllers/authentication');

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// This route is designed to send back the logged in user (or undefined if they are NOT logged in)
app.get('/api/me', function(req, res){
	res.send(req.user)
});
// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()

// TURN THIS ON TO USE AUTHENTICATION &&&&&&&&** ***************************************
// app.use(passportConfig.ensureAuthenticated);

app.get ('/death', function(req,res){
	req.user.deadGuys = req.user.deadGuys || []
	req.user.deadGuys.push({
		name : req.query.deadGuy,
		picture : req.query.picture,
		money : req.query.money,
		sex : req.query.sex,
		cause : req.query.cause,
		inventorystuff : req.query.inventorystuff,
		// newProp : req.query.prop
	})
	req.user.markModified('deadGuys')
	req.user.save( function(err){
		console.log('save err', err)
	} )
	res.redirect('/home')
});
app.get('/home', function(req, res){
  res.sendFile("/html/home.html", {root : './public'})
});
app.get('/game',function(req, res){
  res.sendFile("/choicescript/web/mygame/index.html", {root : './public'})
})
app.post('/api/savedGames', controller.createCharacter)
app.get('/api/me', function(req, res){
	res.send(req.user)
})

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
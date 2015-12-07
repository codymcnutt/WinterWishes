// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var controller = require('./controllers/controller.js')
mongoose.connect('mongodb://localhost/Christmas');

// Auth Requires
// var session = require('express-session');

// Create Express App Object \\
var app = express();


// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
// var controller = require('./controllers/controller')

app.get('/', function(req, res){
  res.sendFile("/html/home.html", {root : './public'})
});

app.get('/api/me', function(req, res){
	res.send(req.user)
});
app.post('/api/savedWishes', controller.createWish)
app.get('/api/me', function(req, res){
	res.send(req.user)
})

// var authenticationController = require('./controllers/authentication');


// TURN THIS ON TO USE AUTHENTICATION &&&&&&&&** ***************************************
// app.use(passportConfig.ensureAuthenticated);

// app.get('/', function(req, res){
//   res.sendFile("/html/home.html", {root : './public'})
// });


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
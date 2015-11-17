// We'll need access to passport in order to call authentication methods
var passport = require('passport');

// We also will be using our User model
var db = require('../models/models');
var User = db.User
/**
 * A utility function (since we'll use it a couple times)
 * to abstract out the actual login procedure, which can
 * be used during authentication or signup. Because it
 * mirrors the middleware that calls it, the parameter
 * structure matches. We also need to know the user model
 * we want to log in.
 */
var performLogin = function(req, res, next, user){
  // Passport injects functionality into the express ecosystem,
  // so we are able to call req.login and pass the user we want
  // logged in.
  req.login(user, function(err){
    console.log('LOGIN', err)
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // Otherwise, send the user to the homepage.
    return res.redirect('/home');
  });
};

/**
 * Our base authentication controller object
 */
var authenticationController = {

  // The route-handler for the /auth/login route. Meant to be
  // a page view that only shows login forms
  login: function(req, res){
    // Send the Login.html file
   // res.sendFile('/html/login.html', {root : './public'})
   res.redirect("/")
  },

  // This is the post handler for any incoming login attempts.
  // Passing "next" allows us to easily handle any errors that may occur.
  processLogin: function(req, res, next){

    // Passport's "authenticate" method returns a method, so we store it
    // in a variable and call it with the proper arguments afterwards.
    // We are using the "local" strategy defined (and used) in the
    // config/passport.js file
    var authFunction = passport.authenticate('local', function(err, user, info){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);

      // If the user was not successfully logged in due to not being in the
      // database or a password mismatch, set a flash variable to show the error
      // which will be read and used in the "login" handler above and then redirect
      // to that handler.
      if(!user) {
		    return res.send('YOU SHALL NOT PASS - The way is shut and the dead keep it. Try a different password/username');
      }
      
      // If we make it this far, the user has correctly authenticated with passport
      // so now, we'll just log the user in to the system.
      performLogin(req, res, next, user);
    });

    // Now that we have the authentication method created, we'll call it here.
    authFunction(req, res, next);
  },

  // Slightly different from our login procedure, the signup process
  // will allow new users to create an account. It will immediately try to
  // create the new user and rely on mongoose to throw any duplication errors.
  // If none are found, the user is successfully added to the DB, it is safe to
  // assume that they are ready to log in, so we do that as well.
  processSignup: function(req, res, next){
    // Create a new instance of the User model with the data passed to this
    // handler. By using "param," we can safely assume that this route will
    // work regardless of how the data is sent (post, get).
    // It is safer to send as post, however, because the actual data won't
    // show up in browser history.
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    // Now that the user is created, we'll attempt to save them to the
    // database.
    user.save(function(err, user){
      
      // If there is an error, it will come with some special codes and
      // information. We can customize the printed message based on
      // the error mongoose encounters
      if(err) {

        // If we encounter this error, the duplicate key error,
        // this means that one of our fields marked as "unique"
        // failed to validate on this object.
        if(err.code === 11000){
		      return res.send({error : 'This user already exists.'})
        }
		else{
			// Generic Error
		  return res.send("lYou broke some shit try again")
			
		}
        
      }

      // If we make it this far, we are ready to log the user in.
      performLogin(req, res, next, user);
    });
  },

  // Handle logout requests
  logout: function(req, res){

    // Passport injects the logout method for us to call
    req.logout();

    // Redirect back to the login page
    res.redirect('/auth/login');
  }
};

// Export our controller methods
module.exports = authenticationController;
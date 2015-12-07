// Include our Model
var DB = require('../models/models')

// Define our Route Handlers

// Create a NEW Wish
var getWishes = function(req, res){
 DB.Wish.find({}, function(err, docs){
 	if(!err) {
 		res.send(docs)
 	}
 	else {res.send("We are currently down please wait...")
 	}
}
 )}
var createWish = function(req, res){
	// change createHero to createWish
	// Data from a POST request lives in req.body

	var newWish = new DB.Wish({
		wish			: req.body.wish,
		name			: req.body.name,
		
	
	})

	newWish.save( function(err, doc){
		res.send(doc)
	})

}


module.exports = {
	createWish : createWish,
	getWishes : getWishes,
}
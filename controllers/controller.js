// Include our Model
var DB = require('../models/models')

// Define our Route Handlers

// Create a NEW Hero
var createCharacter = function(req, res){
	// change createHero to createCharacter
	// Data from a POST request lives in req.body

	var newCharacter = new DB.Character({
		name			: req.body.name,
		email			: req.body.email,
		
		
	})

	newCharacter.save( function(err, doc){
		res.send(doc)
	})

}

// var findHeroes = function(req, res) {
// 	// console.log('before')
// 	// var myFile = fs.readFileSync('WarAndPeace')
// 	// console.log('after')

// 	// console.log('before')
// 	// fs.readFile('WarAndPeace', function(err, data){
// 	// 	console.log('Inside Callback!')
// 	// 	// CODE THAT RELIES ON WAR AND PEACE
// 	// })
// 	// console.log('after')
// 	// // SUPER IMPORTANT CODE THAT CAN EXECUTE BECAUSE ITS NOT HELD UP BY READFILE


// 	// var heroes = []
// 	console.log('REQ PARAMs', req.params)
// 	if (req.params.heroName){
// 		Hero.findOne({name : req.params.heroName}, function(err, doc){
// 			res.send(doc)
// 		})
// 	}
// 	else{

// 		Hero.find({}, function(err, docs){
// 			res.send(docs)
// 			// heroes = docs
// 		})
// 	}
// 	// res.send(heroes)
// }

module.exports = {
	createCharacter : createCharacter,
	
}
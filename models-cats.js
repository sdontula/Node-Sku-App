var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittySchema = Schema({
    	name: String
});

kittySchema.methods.speak = function () {
	var greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
	console.log(greeting);
}

module.exports = mongoose.model('Kitten', kittySchema);

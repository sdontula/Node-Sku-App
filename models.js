var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skuSchema = Schema({
	sku: String,
	model: String,
	description: String,
	capacity: String,
	threshold: String,
	currentLevel: String,
	imageUrl: String
});

module.exports = mongoose.model('Sku', skuSchema);

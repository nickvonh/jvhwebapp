var mongoose = require('mongoose');

//define our item schema
var ItemSchema = new mongoose.Schema({
	customer: String,
	tel: Number,
	email: String,
	address: String,
	itemsOrdered: [{}],
});


//export the mongoose model
module.exports = mongoose.model('Item', ItemSchema);


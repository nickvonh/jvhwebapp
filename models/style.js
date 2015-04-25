var mongoose = require('mongoose');

//define our item schema
var StyleSchema = new mongoose.Schema({
	style: String,
    sizes: [],
	colors: [],
	content: String,
	desc: String,
	price: Number,
});


//export the mongoose model
module.exports = mongoose.model('Style', StyleSchema);

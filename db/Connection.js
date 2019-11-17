var mongoose = require('mongoose');

const mlabURI = 'mongodb+srv://kianto:degod@clustershop-vqtln.mongodb.net/toyshop?retryWrites=true&w=majority' 
const connection = mongoose.connect(mlabURI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, }, (error) => {
	if (error) {
		console.log("Error " + error);
	} else {
		console.log("Connected successfully to mongodb server")
	}
});
mongoose.Promise = global.Promise;

module.exports = connection;

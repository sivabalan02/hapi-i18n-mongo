const mongoClient = require('mongodb').MongoClient;
var configuration = {};
var _db = '';

module.exports = {
	setConfiguration: function(config){
		configuration = config;
	},

	connect: function(){
		var url = 'mongodb://' + configuration.host + ':' + configuration.port + '/' + configuration.name;
	    mongoClient.connect(url, function(error, client) {
	        if(error)
	            console.error(error);
	        else
	        {
	            _db = client;
	        }
	    });
	},

	getDb: function() {
		return _db;
	},

	getCollection: function(){
		return configuration.collection;
	}
}
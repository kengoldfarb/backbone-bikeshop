var basePath = __dirname;
var express = require('express');
var app = module.exports = express();
var fs = require('fs');
var port = 3020;

app.get('/data', function(req, res) {
	//////////////////////////////////////////////////////////////////////////////////////////////
	// Standard way of sending json with express
	//////////////////////////////////////////////////////////////////////////////////////////////
	var bikes = [
	    {
	        "type": "mountain",
	        "brand": "Santa Cruz",
	        "model": "5010",
	        "imagePath": "../../images/1.jpg",
	        "id": 1
	    },
	    {
	        "type": "road",
	        "brand": "Trek",
	        "model": "Domane",
	        "imagePath": "../../images/1.jpg",
	        "id": 2
	    },
	    {
	        "type": "cyclocross",
	        "brand": "Ridley",
	        "model": "X-Fire",
	        "imagePath": "../../images/1.jpg",
	        "id": 3
	    },
	    {
	        "type": "mountain",
	        "brand": "Yeti",
	        "model": "SB-66",
	        "imagePath": "../../images/1.jpg",
	        "id": 4
	    },
	    {
	        "type": "road",
	        "brand": "Giant",
	        "model": "Defy",
	        "imagePath": "../../images/1.jpg",
	        "id": 5
	    },
	    {
	        "type": "cyclocross",
	        "brand": "Focus",
	        "model": "Mares",
	        "imagePath": "../../images/1.jpg",
	        "id": 6
	    }
	];

	return res.json({
		bikes: bikes
	});


	//////////////////////////////////////////////////////////////////////////////////////////////
	// If you want to just read a file and spit out the contents (and set the content type)
	//////////////////////////////////////////////////////////////////////////////////////////////
	// fs.readFile(__dirname + '/../js/data/data.json', function(err, fileData) {
	// 	if (err) {
	// 		throw err;
	// 	}
	// 	res.contentType('application/json');
	//	res.write(fileData);
	//	res.end();
	// });
});

console.log('Starting application on port: ' + port);

app.listen(port);
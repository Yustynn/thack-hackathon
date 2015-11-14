var express = require('express')
var router = express.Router()
module.exports = router;
var keys = require("../../keys");
var https = require('https');

router.get('/', function(req, res){
	var testResponse = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=";
	console.log(keys.key);
	var body = "";
	https.get(testResponse + keys.key, function(resp){
		//console.log("in https")
		//console.log(res.body);
		//console.log(req.body);
		resp.on('data', function(d) {	
			body = body + d;
  		});
  		resp.on('end', function(){
  			res.header('Content-Type','application/json');
			res.statusCode = 200;
  			console.log("on end");
  			res.send(body);
  			res.end();
  		});
	});

	console.log("hola");
	//res.send({location: 'hotelA'});
	//console.log("body: ", body);

	
});
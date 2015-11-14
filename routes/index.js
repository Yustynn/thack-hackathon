var express = require('express')
var router = express.Router()
module.exports = router;
var keys = require("../../keys");
var https = require('https');

router.get('/', function(req, res){
	var longitude = "-87.622206";
	var latitude  = "41.888";
	var address = "151 East Wacker Drive";
	var city = "Chicago";
	var radius = "1500";
	var type = "food";
	var name = "restaurant";
	var testResponse = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude +"&radius=" + radius + "&types=" + type + "&key=";
	var body = "";
	https.get(testResponse + keys.key, function(resp){
		console.log(testResponse + keys.key);
		// to get next page of results, append to the testResponse + keys.key + &pagetoken=[NEXT PAGE TOKEN GOES HERE]
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
  			console.log(body);
  			res.send(body);
  			res.end();
  		});
	});

	console.log("hola");
	//res.send({location: 'hotelA'});
	//console.log("body: ", body);

	
});
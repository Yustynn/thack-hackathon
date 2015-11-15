var express = require('express')
var router = express.Router()
module.exports = router;
var keys = require("../apiKeys");
var https = require('https');
var Promise = require('bluebird');
var requestbb = require("request-bluebird");
// var request = require('request');
// var promiseRequest  = Promise.promisifyAll(request);
var request = Promise.promisify(require("request"));
Promise.promisifyAll(https);

//the object
// var hotels = require("../hotel");


//TODO: Get the data into the right format to pass to yustynn
//WHEN REASONABLY DONE, use promises to clean up
//MY TODO format:{ name: hotelName, numPointsOfInterest, transitInfo:[], restaurant: [{name, rating, price, longitude, latitude}]}



// { minPrice: '569.00' },   { name: 'Courtyard New York Manhattan/Soho',
// starRating: 3.5,     location:      { address: [Object],
// 	longitude: -74.005475,        latitude: 40.727583,
// 	timeZone: 'America/New_York',        neighborhoodId: '3018',
// 	neighborhoodName: 'Soho - Tribeca',        cityId: 3000016152,
// 	zoneId: '51958' },     overallGuestRating: 8.9,
// 	totalReviewCount: 174 },
function evalHotelObj(allHotels){

}

function getSubwaysCloseToHotel(hotel, res, nearByEateries) {
	var name = hotel.name;
	var starRating = hotel.starRating;
	var address = hotel.location.address['addressLine1'];//this is an object that needs to be parsed better
	var zip = hotel.location.address['cityName'];
	var longitude = hotel.location.longitude;
	var latitude = hotel.location.latitude;
	var neighborhoodName = hotel.location.neighborhoodName;
	var overallGuestRating = hotel.overallGuestRating;
	var totalReviewCount = hotel.totalReviewCount;
	//new things to pass back
	var thumbnailUrl = hotel.thumbnailUrl || "";
	var url = hotel.url || "";
	var radius = "600";
	var type = "subway_station";
	var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude +"&radius=" + radius + "&types=" + type + "&key=";
	var body = "";

	https.get(url + keys.key, function (resp) {
			//console.log(resp);
			resp.on('data', function(d) {
				body = body + d;
			});
			resp.on('end', function(){
				//put together object to pass to the rendered view
				var r = {};
				r["name"] = name;
				r["starRating"] = starRating;
				r["address"] = address;
				r["zip"] = zip;
				r["neighborhoodName"] = neighborhoodName;
				r["totalReviewCount"] = totalReviewCount;
				r["stations"] = [];
				var stations = JSON.parse(body).results;
				// console.log(typeof restaurants);
				stations.forEach(function(a){
					var station = {};
					station["name"] = a['name'];
					r["stations"].push(station);
				});
				nearByEateries['subways'] = r;
				res.send(nearByEateries);
				res.end();
			});
	});
}


var promisifiedHttpsGet = Promise.method(function(url) {
	return new Promise(function(resolve, reject) {
		var body = '';
		https.get(url, function(res) {
			res.on('data', function(data) {
				body += data;
			});
			res.on('end', function logginBody() {
				resolve(body);
			});
		});
	})
});


function getFoodByHotel(hotel,res) {

	var name = hotel.name;
	var starRating = hotel.starRating;
	var address = hotel.location.address['addressLine1'];//this is an object that needs to be parsed better
	var zip = hotel.location.address['cityName'];
	var longitude = hotel.location.longitude;
	var latitude = hotel.location.latitude;
	var neighborhoodName = hotel.location.neighborhoodName;
	var overallGuestRating = hotel.overallGuestRating;
	var totalReviewCount = hotel.totalReviewCount;
	//new things to pass back
	var thumbnailUrl = hotel.thumbnailUrl || "";
	var url = hotel.url || "";
	var radius = "1500";
	var type = "food";
	var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude +"&radius=" + radius + "&types=" + type + "&key=";
	var body = "";


	var theFunctionOfHom =  function(body) {
		var r = {
			address: address,
			name: name,
			neighborhoodName: neighborhoodName,
			restaurants: [],
			totalReviewCount: totalReviewCount,
			zip: zip
		};
		var restaurants = JSON.parse(body).results;
		// console.log(typeof restaurants);
		restaurants.forEach(function(a){
			var restaurant = {};
			restaurant["restaurantName"] = a["name"];
			restaurant["priceLevel"] =  a["price_level"];
			restaurant["rating"] = a["rating"];
			r["restaurants"].push(restaurant);
		});
		//this will then send back
		getSubwaysCloseToHotel(hotel, res, r);
	}

	promisifiedHttpsGet(url + keys.key).then(theFunctionOfHom);
}




// 	https.get(url + keys.key, function (resp) {
// 			//console.log(resp);
// 			resp.on('data', function(d) {
// 				body = body + d;
// 			});
// 			resp.on('end', function(){
// 				//put together object to pass to the rendered view
// 				var r = {};
// 				r["name"] = name;
// 				r["starRating"] = starRating;
// 				r["address"] = address;
// 				r["zip"] = zip;
// 				r["neighborhoodName"] = neighborhoodName;
// 				r["totalReviewCount"] = totalReviewCount;
// 				r["restaurants"] = [];
// 				var restaurants = JSON.parse(body).results;
// 				// console.log(typeof restaurants);
// 				restaurants.forEach(function(a){
// 					var restaurant = {};
// 					restaurant["restaurantName"] = a["name"];
// 					restaurant["priceLevel"] =  a["price_level"];
// 					restaurant["rating"] = a["rating"];
// 					r["restaurants"].push(restaurant);
// 				});
// 				//this will then send back
// 				getSubwaysCloseToHotel(hotel, res, r);
// 			});
// 	});
// }

router.get('/testing', function(req, res){
	var hotel =
		{ name: 'Courtyard New York Manhattan/Soho',
		starRating: 3.5,     location:      { address: {addressLine1: "181 Varick St, New York", cityName: "New York"},
			longitude: -74.005475,        latitude: 40.727583,
			timeZone: 'America/New_York',        neighborhoodId: '3018',
			neighborhoodName: 'Soho - Tribeca',        cityId: 3000016152,
			zoneId: '51958' },     overallGuestRating: 8.9,
			totalReviewCount: 174, thumbNail: "", thumbnailUrl : ""};
	//don't forget to update the thumbNail and thumbnailURL, you need to make changes up in evalHotel
	getFoodByHotel(hotel,res);
});

//hard coded
//different types can be found at https://developers.google.com/places/supported_types
router.get('/', function(req, res){
	var longitude = "-74.005475";
	var latitude  = "40.727583";
	var address = "181 Varick St, New York";
	var city = "New York";
	var radius = "600";
	var type = "subway_station";//subway_station
	var testResponse = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude +"&radius=" + radius + "&types=" + type + "&key=";
	var body = "";
	https.get(testResponse + keys.key, function (resp) {
			var body = "";
			resp.on('data', function(d) {
				body = body + d;
			});

			resp.on('end', function(){
				res.send(body);
				res.end();
			});
	});
});




// https.(testResponse + keys.key, function (error, response, body) {
// 	console.log(testResponse + keys.key);
// 	console.log(request instanceof Promise);
// 	// to get next page of results, append to the testResponse + keys.key + &pagetoken=[NEXT PAGE TOKEN GOES HERE]
// 	//console.log("in https")
// 	//console.log(res.body);
// 	//console.log(req.body);
// 	// resp.on('data', function(d) {
// 	// 	body = body + d;
//  // 		});
//  // 		resp.on('end', function(){
//  // 			res.header('Content-Type','application/json');
// 	// 		res.statusCode = 200;
//  // 			console.log("on end");
//  // 			console.log(body);
//  // 			res.send(body);
//  // 			res.end();
//  // 		});
//  	//console.log(body);
//  	res.send(body);
//  	res.end();
//  // console.log(response);
//  // return new Promise(error);
//  // response.send(body);
// }).then(
// 	function(a){
// 		console.log(a);
// 		console.log("What is the life of a promise");
// 	},
// 	function(){
// 		// console.log(error);
// 		console.log("did I screw this up");
// 	}
// );

var express = require('express')
var router = express.Router()
module.exports = router;
var keys = require("../apiKeys");
var https = require('https');
var Promise = require('bluebird');
var hotels = require('../hotel.js');
var request = Promise.promisify(require("request"));
Promise.promisifyAll(https);


function storeSubwaysCloseToHotel(hotel, res, hotels) {
	var requestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
		+ hotel.latitude + "," + hotel.longitude
		+"&radius=" + 600
		+ "&types=" + 'subway_station' +
		"&key=";


	https.get(requestUrl + keys.key, function (resp) {
		resp.on('data', function(d) {
			body = body + d;
		});
		resp.on('end', function(){
			var subways = { stations: [] };

			var unfilteredStations = JSON.parse(body).results;

			unfilteredStations.forEach(function(unfilteredStation){
				unfilteredStation["stations"].push({ name: stationResults.name });
			});

			hotel['subways'] = subways;
			return hotel;
		});
	});
}


function promisifyHotelInfoRequests(hotels) {
		return promisifiedHttpsGet(url + keys.key)
			.then(function resolve(hotel) {
				return hotel[getRestaurants(hotel)];
			}
			.then(function resolve(hotel) {
				return storeSubways(hotel);
			})
			.catch(function reject(err) {
				throw new Error(err);
			});
	}
}


function getRestaurants(body) {
	var restaurants = [],
		unfilteredRestaurants = JSON.parse(body).results,
		requestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
			+ hotel.latitude + "," + hotel.longitude
			+"&radius=" + 1500
			+ "&types=" + 'food' +
			"&key=";

	restaurants.forEach(function(unfilteredRestaurant){
		var restaurant = {};
		restaurant["restaurantName"] = unfilteredRestaurant["name"];
		restaurant["priceLevel"] =  unfilteredRestaurant["price_level"];
		restaurant["rating"] = unfilteredRestaurant["rating"];
		restaurants.push(restaurant);
	});

	return restaurants;
}

var promisifiedHttpsGet = Promise.method(function(url, hotel) {
	return new Promise(function(resolve, reject) {
		var body = '';
		https.get(url, function(res) {
			res.on('data', function buildBody(data) {
				body += data;
			});
			res.on('end', function success() {
				return resolve(body);
			});
			res.on('error', function failure(err) {
				throw new Error(err);
			})
		});
	})
});

// hotels array with necessary keys
filteredHotels = hotels.map(function(unfilteredHotel) {
	var hotel = {
		address: unfilteredHotel.address['addressLine1'],
		name: unfilteredHotel.name,
		latitude: unfilteredHotel.location.latitude,
		longitude: unfilteredHotel.location.longitude,
		neighborhoodName: unfilteredHotel.location.neighborhoodName,
		overallGuestRating: unfilteredHotel.overallGuestRating,
		requestUrl: ,
		starRating: unfilteredHotel.starRating,
		thumbnailUrl: unfilteredHotel.thumbnailUrl,
		totalReviewCount: unfilteredHotel.totalReviewCount,
		url: unfilteredHotel.url,
		zip: unfilteredHotel.location.address.cityName
	};

	return hotel;	
}

router.get('/nearby', function(req, res){
	hotelsPromises = getFoodByHotel(hotels,res);
	Promise.all(hotelsPromises)
		.then(function resolve(hotelsWithInfo) {
			// res.send("nah");
			// evalHotelObj(hotels, res);
			res.send(hotelsWithInfo);
			res.end();
		});
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

	// var hotel =
	// 	{ name: 'Courtyard New York Manhattan/Soho',
	// 	starRating: 3.5,     location:      { address: {addressLine1: "181 Varick St, New York", cityName: "New York"},
	// 		longitude: -74.005475,        latitude: 40.727583,
	// 		timeZone: 'America/New_York',        neighborhoodId: '3018',
	// 		neighborhoodName: 'Soho - Tribeca',        cityId: 3000016152,
	// 		zoneId: '51958' },     overallGuestRating: 8.9,
	// 		totalReviewCount: 174, url: "fasfddas", thumbnailUrl : "stff"};
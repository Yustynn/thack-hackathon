var keys = require("./apiKeys");
var https = require('https');
var Promise = require('bluebird');
var hotels = require('./hotel.js');

function promisifyHotelInfoRequests(hotel) {
	var hotel = hotel,
		// requestUrl for restaurants
		requestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
			+ hotel.latitude + "," + hotel.longitude
			+"&radius=" + 1500
			+ "&types=" + 'food' +
			"&key=" + keys.key;
	return promisifiedHttpsGet(requestUrl)
		.then(function resolve(stuff) {
			hotel.restaurants = getRestaurants(stuff);
			// requestUrl for subways
			requestUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
				+ hotel.latitude + "," + hotel.longitude
				+"&radius=" + 600
				+ "&types=" + 'subway_station' +
				"&key=" + keys.key;
			return promisifiedHttpsGet(requestUrl)
		})
		.then(function resolve(stuff) {
			console.log('entered subway area')
			hotel.subways = getSubways(stuff);
			return hotel;
		})
		.catch(function reject(err) {
			throw new Error(err);
		});
}


function getRestaurants(body) {
	var restaurants = [],
		unfilteredRestaurants = JSON.parse(body).results;

	unfilteredRestaurants.forEach(function(unfilteredRestaurant){
		var restaurant = {
			restaurantName: unfilteredRestaurant.name,
			priceLevel: unfilteredRestaurant.price_level,
			rating: unfilteredRestaurant.rating
		};
		restaurants.push(restaurant);
	});

	return restaurants;
}


function getSubways(body) {
	var subways = { stations: [] };

	var unfilteredStations = JSON.parse(body).results;

	unfilteredStations.forEach(function(unfilteredStation){
		subways["stations"].push({ name: unfilteredStation.name });
	});

	return subways;
}

var promisifiedHttpsGet = Promise.method(function(url) {
	return new Promise(function(resolve, reject) {
		var body = '';
		https.get(url, function(res) {
			res.on('data', function buildBody(data) {
				body += data;
			});
			res.on('end', function success() {
				// console.log(body, 'that was body')
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
		address: 	unfilteredHotel.location.address['addressLine1'],
		name: 		unfilteredHotel.name,
		latitude: unfilteredHotel.location.latitude,
		longitude: unfilteredHotel.location.longitude,
		neighborhoodName: unfilteredHotel.location.neighborhoodName,
		overallGuestRating: unfilteredHotel.overallGuestRating,
		starRating: unfilteredHotel.starRating,
		thumbnailUrl: unfilteredHotel.thumbnailUrl,
		totalReviewCount: unfilteredHotel.totalReviewCount,
		url: unfilteredHotel.url,
		zip: unfilteredHotel.location.address.cityName
	};

	return hotel;
});

hotelsPromises = filteredHotels.map(promisifyHotelInfoRequests);

module.exports = Promise.all(hotelsPromises);

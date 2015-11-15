var getHotelsWithInfo = require('./getHotelsWithInfo');


// divisors for ratings
var FOOD_RATING_DIVISOR = 50,
  TRANSIT_RATING_DIVISOR = 50,
  TOURISM_RATING_DIVISOR = 50;


getHotelsWithInfo.then(function loaded(hotelsWithMapInfo) {
  var hotelsWithRating = [];
  // takes array of restaurants, returns food rating number (out of 5)
  function getFoodRating(restaurants) {
    // take out restaurants < 3.5 stars
    restaurants = restaurants.filter(function(restaurant){
      return restaurant.rating > 3.5;
    });

    var rating = restaurants.length / FOOD_RATING_DIVISOR;
    return rating > 5 ? 5 : rating; // return 5 if rating > 5
  }

  // takes array of transit options (buses/trains) within 1 mile,
  // returns transit rating number (out of 5)
  function getTransitRating(transit) {
    transitSum = transit.reduce(function sum(currentTotal, nextOption) {
      return currentTotal + ( nextOption / nextOption.distance)
    }, 0);

    var rating = transitSum / TRANSIT_RATING_DIVISOR;
    return rating > 5 ? 5 : rating;
  };


  // takes num of points of interest within 2 miles,
  // returns tourism rating number (out of 5)
  function getTourismRating(numPointsOfInterest) {
    var rating = numPointsOfInterest / TOURISM_RATING_DIVISOR;
    return rating > 5 ? 5 : rating;
  };

  // takes array of restaurants, returns food rating number (out of 5)
  hotelsWithMapInfo.forEach(function(hotel) {
    var hotelWithRating = {
      name: hotel.name,
      hotelPrice: hotel.hotelPrice,
      hotelRating: hotel.hotelRating,
      foodRating: getFoodRating(hotel.restaurants),
      tourismRating: getTourismRating(hotel.numPointsOfInterest),
      transitRating: getTransitRating(hotel.subways.stations),
    };

    hotelsWithRating.push(hotelWithRating);
  });

  module.exports = hotelsWithRating;
});

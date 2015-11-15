var getHotelsWithInfo = require('./getHotelsWithInfo'),
  fs = require('fs');


// divisors for ratings
var FOOD_RATING_DIVISOR = 5,
  TRANSIT_RATING_DIVISOR = 3,
  TOURISM_RATING_DIVISOR = 5;


getHotelsWithInfo.then(function loaded(hotelsWithMapInfo) {

  var hotelsWithRating = [];
  hotelsWithMapInfo = JSON.parse(fs.readFileSync('./unfinal.json'));
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
  function getTransitRating(transitOptions) {
    var rating = (transitOptions.length / TRANSIT_RATING_DIVISOR).toFixed(1);
    return rating > 5 ? 5 : rating;
  };


  // takes num of points of interest within 2 miles,
  // returns tourism rating number (out of 5)
  function getTourismRating(numPointsOfInterest) {
    var rating = numPointsOfInterest / TOURISM_RATING_DIVISOR;
    return rating > 5 ? 5 : rating;
  };

  // fs.writeFileSync('./unfinal.json', JSON.stringify(hotelsWithMapInfo));
  // takes array of restaurants, returns food rating number (out of 5)
  hotelsWithMapInfo.forEach(function(hotel) {
    // console.log(hotel);
    var hotelWithRating = {
      name: hotel.name,
      hotelPrice: hotel.hotelPrice,
      hotelRating: hotel.overallGuestRating,
      foodRating: getFoodRating(hotel.restaurants),
      starRating: hotel.starRating,
      thumbnailUrl: hotel.thumbnailUrl,
      tourismRating: getTourismRating(hotel.pointsOfInterest.length),
      transitRating: getTransitRating(hotel.subways.stations),
      url: hotel.url
    };

    hotelsWithRating.push(hotelWithRating);
  });
  fs.writeFileSync('./final.json', JSON.stringify(hotelsWithRating));
});

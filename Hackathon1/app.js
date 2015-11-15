var places = require('./test.js');
//weather.getWeather(zipcode);
var latitude = 40.63432;
var longitude = -73.98799;
//var destLat = process.argv[4];
//var destLong = process.argv[5];
var coordinatePairs = [[40.66089,-73.97923],[40.63145,-73.94009],[40.67743,-73.89512],[40.66089,-73.97923],[40.63145,-73.94009],[40.67743,-73.89512],[40.66089,-73.97923],[40.63145,-73.94009],[40.67743,-73.89512],[40.66089,-73.97923],[40.63145,-73.94009],[40.67743,-73.89512],[40.66089,-73.97923],[40.63145,-73.94009],[40.67743,-73.89512]]

places.getPlaces(latitude,longitude,coordinatePairs);
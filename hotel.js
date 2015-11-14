//1. get all json data from priceline api for NY hotels
//2. store the data in a hotelsBank file
//3. statically access the hotelsBank file
//4. store and export the info from hotelsBank into an array
var fs = require('fs');

fs.readFile('./hotels.json', function(err, contents){
	if(err) throw err;
	var obj = JSON.parse(contents);
	readObjectandAdd(obj);

})


//Initialize storage for all hotels
var hotelsArr = [];

function readObjectandAdd(objHotel) {
    function readObjectandAddHelper(obj) {
        var requiredKeys = ['name', 'location', 'starRating', 'minPrice', 'overallGuestRating', 'totalReviewCount', 'thumbnailURL', 'url'];
        for (var key in obj) {
            if (requiredKeys.indexOf(key) == -1) {
                if (typeof obj[key] === 'object') {
                readObjectandAdd(obj[key]);
                }
            } else {
                hotel[key] = obj[key];
            }
        }
    }
    var hotel = {};
    readObjectandAddHelper(objHotel);
    //console.log(hotel)
    if(Object.getOwnPropertyNames(hotel).length !== 0){
		hotelsArr.push(hotel)
	}
}


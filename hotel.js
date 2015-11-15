//1. get all json data from priceline api for NY hotels
//2. store the data in a hotelsBank file
//3. statically access the hotelsBank file
//4. store and export the info from hotelsBank into an array
var fs = require('fs');

var json = fs.readFileSync('./hotels.json', 'utf-8');
var obj = JSON.parse(json);
var hotelsArr = [];
readObjectandAdd(obj);

//Initialize storage for all hotels


function readObjectandAdd(objHotel) {
    function readObjectandAddHelper(obj) {
        var requiredKeys = ['name', 'location', 'starRating', 'minPrice', 'overallGuestRating', 'totalReviewCount', 'thumbnailUrl', 'hotelId'];
        for (var key in obj) {
            if (requiredKeys.indexOf(key) == -1) {
                if (typeof obj[key] === 'object') {
                readObjectandAdd(obj[key]);
                }
            } else {
            	if(key === "hotelId"){
            		hotel['url'] = 'http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID='+obj[key]+'&noDate=Y';
            	}
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

module.exports = hotelsArr;


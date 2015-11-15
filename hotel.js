//1. get all json data from priceline api for NY hotels
//2. store the data in a hotelsBank file
//3. statically access the hotelsBank file
//4. store and export the info from hotelsBank into an array
var fs = require('fs');

var json = fs.readFileSync('./hotels.json', 'utf-8');
unfilteredHotels = JSON.parse(json)['hotels'];
var hotelsArr = [];
readObjectAndAdd(unfilteredHotels);

//Initialize storage for all hotels


function readObjectAndAdd(unfilteredHotels) {
    
	unfilteredHotels = [].slice.call(unfilteredHotels, 0);
	// console.log(unfilteredHotels)
    unfilteredHotels.forEach(function(unfilteredHotel) {
    	function readObjectAndAddHelper(unfilteredHotel) {
	        var requiredKeys = ['name', 'location', 'starRating', 'minPrice', 'overallGuestRating', 'totalReviewCount', 'thumbnailUrl', 'hotelId'];
	        for (var key in unfilteredHotel) {
	            if (requiredKeys.indexOf(key) === -1) {
	                if (typeof unfilteredHotel[key] === 'object') {
	                readObjectAndAdd(unfilteredHotel[key]);
	                }
	            } else {
	            	if(key === "hotelId"){
	            		hotel['url'] = 'http://www.priceline.com/hotel/hotelOverviewGuide.do?numberOfRooms=1&from=rateSelectionDirect&propID='+unfilteredHotel[key]+'&noDate=Y';
	            	}
	                hotel[key] = unfilteredHotel[key];
	            }
	        }
	    }
    	var hotel = {};
	    readObjectAndAddHelper(unfilteredHotel);
	    //console.log(hotel)
	    if(Object.getOwnPropertyNames(hotel).length !== 0){
	    	hotel['minPrice'] = unfilteredHotel['ratesSummary']['minPrice'];
			hotelsArr.push(hotel);
		}
    })   
}

module.exports = hotelsArr;


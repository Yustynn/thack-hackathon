//1. get all json data from priceline api for NY hotels
//2. store the data in a hotelsBank file
//3. statically access the hotelsBank file
//4. store and export the info from hotelsBank into an array
var fs = require('fs');
<<<<<<< HEAD

fs.readFile('./hotels.json', function(err, contents){
	if(err) throw err;
	var obj = JSON.parse(contents);
	readObjectandAdd(obj);
})
=======
>>>>>>> 28299a1fbe8e7339c927c437a8cc62ce1a1e8dcc

var json = fs.readFileSync('./hotels.json', 'utf-8');
unfilteredHotels = JSON.parse(json)['hotels'];
var hotelsArr = [];
readObjectAndAdd(unfilteredHotels);

//Initialize storage for all hotels

<<<<<<< HEAD
=======

<<<<<<< HEAD
>>>>>>> 28299a1fbe8e7339c927c437a8cc62ce1a1e8dcc
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
<<<<<<< HEAD
	console.log(hotelsArr);
}

=======
=======
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
>>>>>>> fdf5997803b5a8b8461bb2b7e9e288e1b196814d
}

module.exports = hotelsArr;

>>>>>>> 28299a1fbe8e7339c927c437a8cc62ce1a1e8dcc

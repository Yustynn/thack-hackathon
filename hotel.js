//1. get all json data from priceline api for NY hotels
//2. store the data in a hotelsBank file
//3. statically access the hotelsBank file
//4. store and export the info from hotelsBank into an array
// var fs = require('fs');
// var json=JSON.stringify('./hotels2.json');
// var obj = JSON.parse(fs.readFileSync(JSON, 'utf8'));


//Initialize storage for all hotels
var hotelsArr = [];

//Object constructor for a hotel
// var hotelsObj = function(name, addr, lat, long, star, minPrice, guestRating, reviewCount, thumbURL, url ) {
// 	this.name = name;
// 	this.location = {
// 		this.address = addr;
// 		this.lat = lat;
// 		this.long = long;
// 	}
// 	this.starRating = star;
// 	this.minPrice = minPrice;
	// this.overallGuestRating = guestRating;
	// this.totalReviewCount = reviewCount;
	// this.thumbnailURL = thumbURL;
	// this.url = url;
// };

function readObjectandAdd (obj) {
	
}

// Our test Hotel Object

var objHotel = {
	"hotels": [
      {
         "hotelId": "3230705",
         "name": "Hotel Pennsylvania",
         "brandId": "0",
         "hotelVirtualTourURL": "http://www.vfmii.com/exc/aspquery?command=invoke&ipid=1253861&ids=145062",
         "starRating": 2,
         "location": {
            "address": {
               "addressLine1": "401 7th Avenue",
               "cityName": "New York",
               "provinceCode": "NY",
               "countryName": "United States",
               "zip": "10001",
               "phone": "212-736-5000",
               "isoCountryCode": "US"
            },
            "longitude": -73.991234,
            "latitude": 40.750095,
            "timeZone": "America/New_York",
            "neighborhoodId": "3014",
            "neighborhoodName": "Chelsea",
            "cityId": 3000016152,
            "zoneId": "51142"
         },
         "thumbnailUrl": "http://mobileimg.priceline.com/htlimg/3230/3230705/thumbnail-150-square.jpg",
         "hotelFeatures": {
            "hotelAmenityCodes": [
               "PETALLOW",
               "BUSCNTR",
               "RESTRNT",
               "FITSPA",
               "NSMKFAC",
               "HANDFAC"
            ]
         },
         "overallGuestRating": 4.9,
         "totalReviewCount": 580,
         "guestReviewGdsName": "PCLN",
         "proximity": 6.7673965,
         "chainCode": "WV",
         "ratesSummary": {
            "minPrice": "190.40",
            "minCurrencyCode": "USD",
            "minCurrencyCodeSymbol": "$",
            "minStrikePrice": "215.40",
            "pclnId": "61AEC79F0151C7DD5376FE47C1977DFE9A6E7DB2AE25FDCA478F92A2AA1C0B38",
            "freeCancelableRateAvail": true,
            "payWhenYouStayAvailable": true,
            "minRatePromos": [
               {
                  "type": "DISCOUNT",
                  "title": "On Sale Now -> Save 12% on this stay",
                  "desc": "Book Now and Save",
                  "terms": "Blackout dates apply, Offer is not combinable with any other offer, Minimum Stay Required, Based on availability",
                  "valueAddDesc": false,
                  "discountType": "PERCENT",
                  "discountPercentage": 11.606314,
                  "displayStrikethroughPrice": "215.40",
                  "displayStrikethroughPriceCurrency": "USD",
                  "nativeStrikethroughPrice": "215.40",
                  "nativeStrikethroughPriceCurrency": "USD",
                  "showDiscount": true,
                  "freeNightCumulative": false,
                  "numNightsPerFreeNight": 0,
                  "numFreeNightsGiven": 0
               }
            ],
            "availablePromos": [
               {
                  "type": "DISCOUNT",
                  "title": "On Sale Now -> Save 12% on this stay",
                  "desc": "Book Now and Save",
                  "terms": "Blackout dates apply, Offer is not combinable with any other offer, Minimum Stay Required, Based on availability",
                  "valueAddDesc": false,
                  "discountType": "PERCENT",
                  "discountPercentage": 11.606314,
                  "displayStrikethroughPrice": "215.40",
                  "displayStrikethroughPriceCurrency": "USD",
                  "nativeStrikethroughPrice": "215.40",
                  "nativeStrikethroughPriceCurrency": "USD",
                  "showDiscount": true,
                  "freeNightCumulative": false,
                  "numNightsPerFreeNight": 0,
                  "numFreeNightsGiven": 0
               }
            ],
            "ccNotRequiredAvailable": false
         },
         "allInclusiveRateProperty": false,
         "recentlyViewed": false,
         "dealUnwrapable": false
      },
]
}
console.log(objHotel);
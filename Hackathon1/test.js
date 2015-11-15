  

  //Problem: We need a simple way to look at a user's badge count and JavaScript points
  
  //Use node.js to connect to Treehouse's API to get profile information to print out
  
  var https = require("https");
  var http = require("http");
  var apiKey = require("./apikey.js");
  
  //Print out error message
  function printError(error){  
    console.error(error.message);
  };
  
  //Print out message
  function printMessage(data){
   //res.status()
  data = JSON.parse(data);
  distanceArray = [];
  //console.log(data.rows[0].elements);
  data.rows[0].elements.forEach(function(element){

      distanceArray.push(parseFloat(element.distance.text.split(' ')[0]));
  })
  console.log(distanceArray);
  
  };

  //https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=YOUR_API_KEY
//+originLatitude+","+originLongitude+"&destinations="+destLat+","+destLong+
  
  //Connect to the Google API
//+latitude+","+longitude+

  //Connect to the API URL
var getPlaces = function(originLat,originLong,arrayOfDestinationCoords){  

  var destString = [];

  arrayOfDestinationCoords.forEach(function(coordPairs){
    destString.push(coordPairs[0].toString()+","+coordPairs[1].toString())
  })

   var request = https.get("https://maps.googleapis.com/maps/api/distancematrix/json?origins="+originLat+ "," + originLong + "&destinations="+destString.join("|")+"&mode=driving&units=imperial&key="+apiKey.apiKey,function(response){
      
      //console.dir(response.statusCode);
    
    var body = "";
    
    //Read the data
    response.on('data', function (chunk) {
      body+= chunk;
    });
    
    response.on('end',function(){
      if(response.statusCode === 200){
      try{
      //Parse the data
      var places = JSON.parse(body);
      //Print the data
       //distanceArray.push(JSON.parse(body).rows[0].elements[0].distance.text);
       printMessage(body);
       //console.log(body);
      }catch(error){
       //parse Error
        printError(error);
      };
      }else{
        printError({message: "There was an error getting the distance information for one of the locations" + http.STATUS_CODES[response.statusCode] + ")"});
      };
    });
    });
   request.on("error", printError);



  
   //Connection error
  
};

module.exports.getPlaces =getPlaces;
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var hotelsWithRatings = require('./hotelsWithRatings');
// REMEMBER TO PLUGIN YOUR ROUTERS HERE!
app.use(bodyParser.json());
var PORT = 3000;
// app.use('/',function(req, res, next){
// 	console.log(res.statusCode, req.method, req.path, req.body);
// 	next();
// });


app.listen(PORT);

var express = require('express')
var bodyParser = require('body-parser')
var app = express();
module.exports = app //this line is only used to make testing easier
var routes = require('./routes/');
// REMEMBER TO PLUGIN YOUR ROUTERS HERE!
app.use(bodyParser.json());
var PORT = 3000;

// app.use('/',function(req, res, next){
// 	console.log(res.statusCode, req.method, req.path, req.body);
// 	next();
// });

app.use('/', routes);

app.listen(PORT);
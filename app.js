var express = require("express");

var app = express();

var port = 8088;

app.get("/", function(req, res){
	res.send("Hello world");
});

app.listen(port, function(err){
	console.log("running server on port " + port);
});

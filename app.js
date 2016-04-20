var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 8888));

app.get('/', function(req, res){
	res.send('Hello world');
});

app.listen(app.get('port'), function(err){
	console.log('running server on port ' + app.get('port'));
});

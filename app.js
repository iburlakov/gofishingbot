var express = require('express');
var bodyParser = require('body-parser');

var request = require('request');

var app = express();

var TOKEN = process.env.BOT_TOKEN;
var API_URL = 'https://api.telegram.org/bot';

app.set('port', (process.env.PORT || 8888));

app.use(bodyParser.json());


var options = {
	uri: API_URL + API_URL + '/setWebhook',
	method: 'POST',
	json: {
		url: 'https://gofishingbot.iburlakov.com/telegram-web-hook'
	}
};

request(options, function(error, response, body) {
	if(!error && respo.statusCode == 200) {
		console.log("OK - web hook registered");
	}
};

app.get('/', function(req, res){
	res.send('Hello world');
});

app.get('/books', function(req, res){
	res.send('Hello books');
});

app.get('/telegram-web-hook', function(req, res){
	console.log('got GET request: ' + req.body);

	res.send(200);

});

app.post('/telegram-web-hook', function(req, res){
	console.log('got POST request: ' + req.body.update);

	res.json(req.body);
});

app.listen(app.get('port'), function(err){
	console.log('running server on port ' + app.get('port'));
});

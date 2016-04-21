var express = require('express');
var bodyParser = require('body-parser');

var request = require('request');

var app = express();

var TOKEN = process.env.BOT_TOKEN;
var API_URL = 'https://api.telegram.org/bot';


app.set('port', (process.env.PORT || 8888));

app.use(bodyParser.json());


console.log('getMe');
request(
	{
		uri: API_URL + TOKEN + '/getMe',
		method: 'GET'
	},
	function(error, response, body) {
		var result = JSON.parse(body);
		if (!error && response.statusCode == 200) {
			console.log("%s is ready", result.result.username);
		} else {
			console.log("Bot is not ready, getMe returned %d (%s)", response.statusCode, result.description);
		}
	});

console.log('setWebhook');
request({
		uri: API_URL + TOKEN + '/setWebhook',
		method: 'POST',
		json: {
			url: 'https://gofishingbot.iburlakov.com/telegram-web-hook'
		}
	},
	function(error, response, body) {
		if (!error && response.statusCode == 200) {
			if (body.ok) {
				console.log("Webhook is set");
			} else {
				console.log("Setting webhook failed: %s", result.description);
			}
		} else {
			console.log("Setting webhook failed: %d", response.statusCode);
		}
	});

//console.log('setting web hook');

app.get('/', function(req, res){
	res.send('Hello world');
});

app.get('/books', function(req, res){
	res.send('Hello books');
});


app.post('/telegram-web-hook', function(req, res){
	var data = req.body;

	console.log('Got message from %s: %s', data.Message.User.id, data.Message.text);

	//TODO: send mesage back

	res.send(200);
});

app.listen(app.get('port'), function(err){
	console.log('running server on port ' + app.get('port'));
});

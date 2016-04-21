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
			url: 'https://guarded-inlet-80930.herokuapp.com/telegram-web-hook'
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

app.get('/books', function (req, res){
	res.send('Hello books');
});


app.post('/telegram-web-hook', function(req, res){
	var data = req.body;

	console.log('Got message from %s: %s', data.message.from.first_name, data.message.text);

	request({
	        uri: API_URL + TOKEN + '/sendMessage',
	        method: 'POST',
			json: {
				chat_id: data.message.chat.id,
				text: 'go fishing'
		}},
		function (error, response, body) {
			if (response.statusCode == 200 && body.ok) {
				console.log('Message send back:');
				console.log(body);
			} else {
				console.log('Error sending message back');
			}
		});


	res.sendStatus(200);
});

app.listen(app.get('port'), function(err){
	console.log('running server on port ' + app.get('port'));
});

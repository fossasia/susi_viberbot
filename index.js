var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/',function(req, response){
	response.writeHead(200,{'content-type': 'text/plain'});
	response.write("To chat with Susi through Viber, visit this link - chats.viber.com/chatauto and click on the 'Have a look' button");
	// setting options to request the chat api of viber.
	var options={
			method: 'POST',	
			url: 'https://chatapi.viber.com/pa/set_webhook',
			headers: 
			{ 
				'cache-control': 'no-cache',
				'content-type': 'application/json',
				'x-viber-auth-token': '45a53f0fcb325002-41552d1f93cd0d0f-1a8d7fa78758d158'
			},
			body: 
			{
			 	url: 'https://intense-crag-83953.herokuapp.com',
			 	event_types: ['delivered', 'seen', 'failed', 'subscribed', 'unsubscribed', 'conversation_started']
			},
			json: true 
	};
	// request to the chat api of viber.
	request(options, function(error, response, body) {
		if (error) throw new Error(error);
		alert(body);
	});
	response.end();
});

app.post('/', function(req, response) {
	response.writeHead(200);
	
	// If user sends a message in 1-on-1 chat to the susi public account
	if(req.body.event === 'message'){
		// Susi answer to a user message
		var ans;
		var request = require("request");
		
		// setting options to request susi bot.
		var options1 = { 
					method: 'GET',
					url: 'http://api.asksusi.com/susi/chat.json',
					qs: { timezoneOffset: '-330', q: req.body.message.text }
				};
				
		// A request to the Susi bot
		request(options1, function (error1, response1, body1) {
  			if (error1) throw new Error(error1);
  			// answer fetched from susi
			ans = (JSON.parse(body1)).answers[0].actions[0].expression;
  			
			// setting options to request the chat api of viber.
			var options =   {
						method: 'POST',	
						url: 'https://chatapi.viber.com/pa/send_message',
						headers: 
						{ 
							'cache-control': 'no-cache',
							'content-type': 'application/json',
							'x-viber-auth-token': '45a53f0fcb325002-41552d1f93cd0d0f-1a8d7fa78758d158'
						},
						body: 
						{
							receiver: req.body.sender.id,
							min_api_version: 1,
							sender: 
							{
								name: 'Susi',
								avatar: 'https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwirq6TRoYvTAhWMLI8KHSgVCXsQjRwIBw&url=https%3A%2F%2Fjigyasagrover.wordpress.com%2F2016%2F05%2F26%2Floklak-brief-one-googlesummerofcode-fossasia%2F&bvm=bv.151426398,d.c2I&psig=AFQjCNG01WP05rdho79rkRnGvuwTzs8_hA&ust=1491411117179108' 
							},
							tracking_data: 'tracking data',
							type: 'text',
							text: ans 
						},
						json: true 
					};
			// request to the chat api of viber.
			request(options, function (error, response, body) {
				if (error) throw new Error(error);
				console.log(body);
			});
		});		
	}
	
	// When user opens 1-on-1 chat with Susi public account
	else if(req.body.event === 'conversation_started'){
		// Welcome Message
		var request = require("request");
		var options = {
					method: 'POST',	
  					url: 'https://chatapi.viber.com/pa/send_message',
					headers: 
				    { 
				    	'cache-control': 'no-cache',
				    	'content-type': 'application/json',
				    	'x-viber-auth-token': '45a53f0fcb325002-41552d1f93cd0d0f-1a8d7fa78758d158'
				    },
				    body: 
				    {
				    	receiver: req.body.user.id,
				     	min_api_version: 1,
				    	sender: 
				    	{
				    		name: 'Susi',
				        	avatar: 'https://www.google.co.in/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwirq6TRoYvTAhWMLI8KHSgVCXsQjRwIBw&url=https%3A%2F%2Fjigyasagrover.wordpress.com%2F2016%2F05%2F26%2Floklak-brief-one-googlesummerofcode-fossasia%2F&bvm=bv.151426398,d.c2I&psig=AFQjCNG01WP05rdho79rkRnGvuwTzs8_hA&ust=1491411117179108' 
				    	},
			     		tracking_data: 'tracking data',
			     		type: 'text',
			     		text: 'Hi from your favourite, Susi!, '+req.body.user.name+'.\n\nThanks for stopping by :)!\n\nLook at this link - http://susi-server.readthedocs.io/en/latest/tutorial/AskSUSI.html, to know what all I can do for you!' 
				   	},
				  	json: true 
				};

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
		});
	}
	response.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



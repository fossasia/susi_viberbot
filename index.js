var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var http = require('http');
var headerBody = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
    // recommended to inject access tokens as environmental variables, e.g.
    'x-viber-auth-token': process.env.X_VIBER_AUTH_TOKEN
};
var buttons = [];
var text = [];
var link = [];
var value;
app.set('port', (process.env.PORT || 5000));

//to ping heorku app after 20 minutes to keep it active
setInterval(function() {
    http.get('https://intense-crag-83953.herokuapp.com');
}, 1200000);

//app.use(express.static(__dirname + '/public'));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, response) {
    response.writeHead(200, {
        'content-type': 'text/plain'
    });
    response.write("To chat with Susi through Viber, visit this link - chats.viber.com/chatauto and click on the 'Have a look' button\n\n");
    // setting options to request the chat api of viber.
    var options = {
        method: 'POST',
        url: 'https://chatapi.viber.com/pa/set_webhook',
        headers: headerBody,
        body: {
            url: 'https://intense-crag-83953.herokuapp.com',
            event_types: ['delivered', 'seen', 'failed', 'subscribed', 'unsubscribed', 'conversation_started']
        },
        json: true
    };
    // request to the chat api of viber.
    request(options, function(error, res, body) {
        if (error) throw new Error(error);
        response.write("The status message received for set Webhook request is - " + body.status_message);
        response.end();
    });
});

app.post('/postToPublic', function(req, response) {
    response.writeHead(200);
    // setting options to request the chat api of viber.
    var options = {
        method: 'POST',
        url: 'https://chatapi.viber.com/pa/post',
        headers: headerBody,
        body: {
            from: "0JzJAjLh7wGDPJwDobRhwg==",
            sender: {
                name: 'Susi',
                avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
            },
            type: 'text',
            text: req.body.val
        },
        json: true
    };
    // request to the chat api of viber.
    request(options, function(error, res, body) {
        if (error) throw new Error(error);
    });
    response.end();
});

app.post('/', function(req, response) {
    response.writeHead(200);

    // If user sends a message in 1-on-1 chat to the susi public account
    if (req.body.event === 'message') {
        // Susi answer to a user message
        var ans;
        var request = require('request');
				var message = req.body.message.text;

        // setting options to request susi bot.
        var options1 = {
            method: 'GET',
            url: 'http://api.asksusi.com/susi/chat.json',
            qs: {
                timezoneOffset: '-330',
                q: req.body.message.text
            }
        };

        // A request to the Susi bot
        request(options1, function(error1, response1, body1) {
            if (error1) throw new Error(error1);
            // answer fetched from susi
            ans = (JSON.parse(body1)).answers[0].actions[0].expression;
            var type = (JSON.parse(body1)).answers[0].actions;

            // checking type of json response
            if (type.length == 3 && type[2].type == "map") {
                var latitude = type[2].latitude;
                var longitude = type[2].longitude;

                var options = {
                    method: 'POST',
                    url: 'https://chatapi.viber.com/pa/send_message',
                    headers: headerBody,
                    body: {
                        receiver: req.body.sender.id,
                        min_api_version: 1,
                        sender: {
                            name: 'Susi',
                            avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                        },
                        tracking_data: 'tracking data',
                        type: 'text',
                        text: ans
                    },
                    json: true
                };

                // request to the chat api of viber.
                request(options, function(error, res, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                });

                var options1 = {
                    method: 'POST',
                    url: 'https://chatapi.viber.com/pa/send_message',
                    headers: headerBody,
                    body: {
                        receiver: req.body.sender.id,
                        min_api_version: 1,
                        sender: {
                            name: 'Susi',
                            avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                        },
                        tracking_data: 'tracking data',
                        type: 'location',
                        location: {
                            lat: latitude,
                            lon: longitude
                        }

                    },
                    json: true
                };
                // request to the chat api of viber.
                request(options1, function(error, res, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                });
            } else if (type.length == 1 && type[0].type == "table") {
                var data = (JSON.parse(body1)).answers[0].data;
                var columns = (JSON.parse(body1)).answers[0].actions[0].columns;
                var key = Object.keys(columns);

                for (i = 0; i < 10; i++) {
                    text[i] = "";
                    link[i] = data[i][key[2]];
                    for (j = 0; j < key.length; j++) {
                        value = key[j];
                        console.log(data[i][value]);
                        text[i] += "<font color=#323232><b>" + value + ": </b>" + data[i][value] + "</font><br>";
                    }
                }

                for (i = 0; i < 10; i++) {
                    buttons[i] = {
                        Columns: 6,
                        Rows: 3,
                        Text: text[i],
                        "ActionType": "open-url",
                        "ActionBody": link[i],
                        "TextSize": "medium",
                        "TextVAlign": "middle",
                        "TextHAlign": "middle"
                    };
                }

                var options1 = {
                    method: 'POST',
                    url: 'https://chatapi.viber.com/pa/send_message',
                    headers: headerBody,
                    body: {
                        receiver: req.body.sender.id,
                        min_api_version: 2,
                        type: 'rich_media',
                        rich_media: {
                            Type: "rich_media",
                            ButtonsGroupColumns: 6,
                            ButtonsGroupRows: 6,
                            BgColor: "#FFFFFF",
                            Buttons: buttons
                        }
                    },
                    json: true
                };

                request(options1, function(error, res, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                });
            } else if (type.length == 2 && type[1].type == "rss"){
              var data = (JSON.parse(body1)).answers[0].data;
              var columns = type[1];
              var key = Object.keys(columns);
              var msg = [];
              console.log(key);

              for (var i = 0; i < 4; i++) {
              if(i==0){
                    msg = (JSON.parse(body1)).answers[0].actions[0].expression;

                    var options = {
                        method: 'POST',
                        url: 'https://chatapi.viber.com/pa/send_message',
                        headers: headerBody,
                        body: {
                            receiver: req.body.sender.id,
                            min_api_version: 1,
                            sender: {
                                name: 'Susi',
                                avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                            },
                            tracking_data: 'tracking data',
                            type: 'text',
                            text: msg
                        },
                        json: true
                    };

                    // request to the chat api of viber.
                    request(options, function(error, res, body) {
                        if (error) throw new Error(error);
                        console.log(body);
                    });

              } else{
                    msg = "";
                    msg =key[1].toUpperCase() + ": " + data[i][key[1]] + "\n" + key[2].toUpperCase() + ": " + data[i][key[2]] + "\n" + key[3].toUpperCase() + ": " + data[i][key[3]];

                    var options = {
                        method: 'POST',
                        url: 'https://chatapi.viber.com/pa/send_message',
                        headers: headerBody,
                        body: {
                            receiver: req.body.sender.id,
                            min_api_version: 1,
                            sender: {
                                name: 'Susi',
                                avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                            },
                            tracking_data: 'tracking data',
                            type: 'text',
                            text: msg
                        },
                        json: true
                    };

                    // request to the chat api of viber.
                    setTimeout(function() {
                    request(options, function(error, res, body) {
                        if (error) throw new Error(error);
                        console.log(body);
                    });
                  }, 500);

                }
              }
            } else if(link.indexOf(message) <= -1) {

                var options = {
                    method: 'POST',
                    url: 'https://chatapi.viber.com/pa/send_message',
                    headers: headerBody,
                    body: {
                        receiver: req.body.sender.id,
                        min_api_version: 1,
                        sender: {
                            name: 'Susi',
                            avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                        },
                        tracking_data: 'tracking data',
                        type: 'text',
                        text: ans
                    },
                    json: true
                };
                // request to the chat api of viber.
                request(options, function(error, res, body) {
                    if (error) throw new Error(error);
                    console.log(body);
                });
            }
          });
    }

    // When user opens 1-on-1 chat with Susi public account
    else if (req.body.event === 'conversation_started') {
        // Welcome Message
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'https://chatapi.viber.com/pa/send_message',
            headers: headerBody,
            body: {
                receiver: req.body.user.id,
                min_api_version: 1,
                sender: {
                    name: 'Susi',
                    avatar: 'https://github.com/fossasia/susi_viberbot/tree/master/docs/images/susi.png'
                },
                tracking_data: 'tracking data',
                type: 'text',
                text: 'Hi from your favourite, Susi!, ' + req.body.user.name + '.\n\nThanks for stopping by :)!\n\nLook at this link - http://susi-server.readthedocs.io/en/latest/tutorial/AskSUSI.html, to know what all I can do for you!'
            },
            json: true
        };

        request(options, function(error, res, body) {
            if (error) throw new Error(error);
            console.log(body);
        });
    }
    response.end();
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

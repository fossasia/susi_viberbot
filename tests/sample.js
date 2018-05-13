var request = require("request");

var url = "http://api.asksusi.com/susi/chat.json?q=Hi";

request({
    url: url,
    json: true
});

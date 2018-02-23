
const bodyParser = require ('body-parser')
const MySportsFeeds = require("mysportsfeeds-node");
const request = require('request');
const btoa = require('btoa');
var msf = new MySportsFeeds("1.2", true, null);

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
  app.use (bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.post('/feeds', function(req, res) {
    // var data = msf.getData( req.body.league, '2017-playoff', 'full_game_schedule', 'json', {});
    // var url = "https://api.mysportsfeeds.com/v1.0/pull/"+req.body.league+"/"+req.body.season+"/"+"full_game_schedule/json";
    // var options = {
    //   method: 'post',
    //   json: true,
    //   url: url
    // }

    const options = {
        url: "https://api.mysportsfeeds.com/v1.2/pull/"+req.body.league+"/"+req.body.season+"/"+"full_game_schedule.json",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            "Authorization": "Basic " + btoa("dennisk148" + ":" + "dennis")
        }
    };

    console.log(options.url);
    request(options, function(err, respo, body) {
      if (err){
        console.log("Error ocurred while using MySportsFeeds API: " + err);
        res.status(500);
        res.render('error', { error: err });
      } else {
        console.log(body);
        res.send(body);
      }
    });

  });
}

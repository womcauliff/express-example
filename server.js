// Declares Express dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Configures Express server
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({
	extended: 5000
}));// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

//html routes
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/wall", function(req, res){
	res.sendFile(path.join(__dirname + "/wall.html"));
});

// Makes public a static directory
app.use(express.static(process.cwd() + '/public'));

// Listening
app.listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s mode", 
  this.address().port, app.settings.env);
});
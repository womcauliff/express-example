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

//api routes

var notes = [
	{
		"name" : "dan",
		"msg" : "wassup"
	},
	{
		"name" : "glen",
		"msg" : "hi will!"
	}
];

app.get("/note", function(req, res) {
	res.json(notes);
});

app.post("/note", function(req, res) {

	console.log("New Note From Client:\n" + JSON.stringify(req.body));

	//Verify that Note sent in Client's POST request has a name
	if(req.body.name === undefined || req.body.name === "") {

		console.error("error:\n" + JSON.stringify(req.body));

		//Send error message back to Client, ignoring the Client's Note object
		res.status(400).json({
			error : true,
			msg : "Missing 'name' field"
		});
	}
	//Verify that Note sent in Client's POST request has a message body
	else if(req.body.msg === undefined || req.body.msg === "") {

		console.error("error:\n" + JSON.stringify(req.body));

		//Send error message back to Client, ignoring the Client's Note object
		res.status(400).json({
			error : true,
			msg : "Missing 'msg' field."
		});
	}
	// The new Note sent in Client's POST request is valid
	else {

		// Add the new Note to existing notes array
		notes.push(req.body);
		console.log("All Notes:\n" + JSON.stringify(notes));

		// Send a success JSON in response
		res.status(200).json({
			error : false,
			msg : "Success."
		});
	}
});

// Makes public a static directory
app.use(express.static(process.cwd() + '/public'));

// Listening
app.listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s mode", 
  this.address().port, app.settings.env);
});
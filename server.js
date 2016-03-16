var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var path = require('path');
var favicon = require('serve-favicon');

var app = express();
var PORT = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/assets', 'favicon.ico')));
app.use('/js',express.static(path.join(__dirname, '/js')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

//Get all records
app.get('/data',  function (req,res) {

	db.record.findAll().then (function (record) {
		res.json(record);
	}, function (e) {
		res.status(500).send();
	})

})


//Add new record
app.post('/data', function (req,res) {
	var body = _.pick(req.body, 'name', 'description', 'money');

	db.record.create(body).then(function (record) {
			res.json(record.toJSON());
		},function (e) {
		res.status(400).json(e);
	});

});


db.sequelize.sync({force:true}).then(function () {
		app.listen(PORT, function () {
		console.log('Express listening on port '+ PORT + '!');
	});
});

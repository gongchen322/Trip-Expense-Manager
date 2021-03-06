var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var path = require('path');
var bcrypt = require('bcrypt');
var favicon = require('serve-favicon');


var middleware = require('./middleware.js')(db);

var app = express();
var PORT = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '/assets', 'favicon.ico')));
app.use('/js',express.static(path.join(__dirname, '/js')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

//Get the TripInfo data
app.get('/data', middleware.requireAuthentication, function (req,res) {
	var where = {
		userId: req.user.get('id')
	};


	db.tripInfo.findAll({where : where}).then (function (tripInfo) {
		res.json(tripInfo);
	}, function (e) {
		res.status(500).send();
	})

})


//Add new TripInfo data
app.post('/data', function (req,res) {
	var body = _.pick(req.body, 'groupName', 'numberOfPeople', 'totalCost','averageCost','expenseDetail');

	db.tripInfo.create(body).then(function (tripInfo) {
			res.json(tripInfo.toJSON());
		},function (e) {
		res.status(400).json(e);
	});

});


//Add users
app.post('/users', function (req, res) {
	var body = _.pick(req.body, 'name','email', 'password');
	console.log(body);
	db.user.create(body).then(function (user) {
		res.json(user.toPublicJSON());
	}, function (e) {
		res.status(400).json(e);
	})
});

//POST /users/login

app.post('/users/login', function (req, res) {
	var body = _.pick(req.body, 'email', 'password');
	var userInstance;

	db.user.authenticate(body).then(function (user) {
		var token = user.generateToken('authentication');
		userInstance = user;
		return db.token.create({
			token: token
		});
		
	}).then(function (tokenInstance) {
		res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
	}).catch (function (e) {
		res.status(401).send();
	});

	
});


// DELETE /users/login
app.delete('/users/login', middleware.requireAuthentication,function (req, res) {
	
	req.token.destroy().then(function () {
		res.status(204).send();
	}).catch(function () {
		res.status(500).send();
	});
});

db.sequelize.sync().then(function () {
		app.listen(PORT, function () {
		console.log('Express listening on port '+ PORT + '!');
	});
});

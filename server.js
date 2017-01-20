var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var cuevaRouter = require('./routes/cuevaRouter');

var app = express();

var mongoose = require('mongoose');

var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

console.log('mongoURL: ' + mongoURL);

console.log(process.env);
console.log(JSON.stringify(process.env));

var dbUrl = process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME || 'user:user@mongodb://127.0.0.1:27017/cueva';
console.log('process.env.OPENSHIFT_MONGODB_DB_USERNAME = ' + process.env.OPENSHIFT_MONGODB_DB_USERNAME);
console.log('process.env.OPENSHIFT_MONGODB_DB_PASSWORD = ' + process.env.OPENSHIFT_MONGODB_DB_PASSWORD);
console.log('process.env.OPENSHIFT_MONGODB_DB_HOST = ' + process.env.OPENSHIFT_MONGODB_DB_HOST);
console.log('process.env.OPENSHIFT_MONGODB_DB_PORT = ' + process.env.OPENSHIFT_MONGODB_DB_PORT);
console.log('process.env.OPENSHIFT_MONGODB_DB_URL = ' + process.env.OPENSHIFT_MONGODB_DB_URL);
console.log('process.env.OPENSHIFT_APP_NAME = ' + process.env.OPENSHIFT_APP_NAME);

dbUrl = 'mongodb://user:user@' + process.env.MONGODB_PORT + '/cueva';
console.log('dbUrl = ' + dbUrl);
mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión'));
db.once('open', function () {
	console.log('Conectado correctamente con el servidor');
});

app.listen(8080);

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/cueva', cuevaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;

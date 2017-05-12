var express = require('express');
var mysql = require('mysql');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var jobs = require('./routes/jobs');
var login = require('./routes/login');
var register = require('./routes/register');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/jobs',jobs);

// Testing /jobs/:id URL This is still to be implemented

app.get('/jobs/:id', function(req,res){

	var connection = mysql.createConnection(
		{
			host : 'localhost',
			user : 'root',
			password : 'root',
			database : 'shop'

		});

	connection.connect(function(err){
		if (err) {
			console.log(err);
			res.send("Could not connect to Database");
		}else{
			console.log("Connected to Database");
		}
	});

    connection.query("SELECT * FROM jobs WHERE id = ?", [req.params.id], function(err,results,fields){
    		if (err) {
    			console.log("Query Error");
    			res.send("Query Error " + err);
    		}else{
    			console.log("Number of rows returned : " + results.length);
    			console.log("Job request  " + req.params.id);
    			if (results.length != 1) {
    				res.render('jobs', { title: 'Trigger Jobs','data' : results,'msg':'Job not found'});
    			}else{
    				res.render('job', { title: 'Trigger Jobs','data' : results,'msg':' '});
    			}

				
    		}
    });


	
});

app.use('/login',login);
app.use('/register',register);
app.use(function(req,res,next){
	res.type('text/html');
	res.status(404);
	res.render('404',{'title' : '404 Page Not Found!!!'})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

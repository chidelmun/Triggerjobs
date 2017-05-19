var express = require('express');
var mysql = require('mysql');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {


		var connection = mysql.createConnection({
		  	host : 'localhost',
		  	user : 'root',
		  	password : 'root',
		  	database : 'shop'
		});

		var message = "";

	  	connection.connect(function(err){
	  		if (err) {
	  			console.log("Error connecting to Database");
	  		}else{
	  			console.log("Connected to DB")
	  		}
	  	});


  		connection.query("SELECT * FROM jobs order by location", function(err,results,fields){
		  		if (err) {
		  			console.log("Query Error");
		  			res.send("Error occured with query : " + err );

		  		}else{
		  			console.log(results);
		  			res.render('jobs', { title: 'Trigger Jobs','data' : results,'msg' : " " });
		  		}
  		});

  
});

router.get('/jobs/hello', function(req,res,next){
	console.log("Job page requested "  + req.body.id);
	res.send("Hello");
});


	/* List all Jobs */

router.post('/', function(req, res) {

	var connection = mysql.createConnection({
		  	host : 'localhost',
		  	user : 'root',
		  	password : 'root',
		  	database : 'shop'
		});

		var message = "";

	  	connection.connect(function(err){
	  		if (err) {
	  			console.log("Error connecting to Database");
	  		}else{
	  			console.log("Connected to DB")
	  		}
	  	});


  		connection.query("SELECT * FROM jobs where location like ? or title like ?", [req.body.location,req.body.job], function(err,results,fields){
		  		if (err) {
		  			console.log("Query Error");
		  			res.send("Error occured with query : " + err );

		  		}else{
		  			console.log(results);
		  			if (results.length > 0) {
		  				var message  = "";
		  			}else{
		  				message = "No Job listings found!";
		  			}
		  			res.render('jobs', { title: 'Trigger Jobs','data' : results, 'msg' : message});
		  		}
  		});


});



module.exports = router;

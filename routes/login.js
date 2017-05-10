var express = require('express');
var mysql = require('mysql');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login', { title: 'Trigger Jobs' });

});

router.post('/',function(req,res,next){
  
  var connection = mysql.createConnection({
  	host : 'localhost',
  	user : 'root',
  	password : 'root',
  	database : 'shop'
  });

  connection.connect(function(err){
  		if (err) {
  			console.log("Error connecting to Database");
  		}else{
  			res.end('Hello World');
  		}
  });




  

})

module.exports = router;

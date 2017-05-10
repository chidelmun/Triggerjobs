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
  			console.log("Connected to DB")
  		}
      var email = req.body.email;
      var password = req.body.pwd;
  connection.query("SELECT * FROM tb_users WHERE email = ? ", [email], function(err,results,fields){

      if (err) {
        console.log(err);
        throw err;
      }else{
        console.log("Query correct");

      }

      if(results.length > 0){
        console.log("Non Empty results");
          if (password == results[0].passwd) {
            res.send("Email and Password Match");   // Handle Successful Login and create User session
          }else{                                    // Redirect to home page
            console.log(results[0].passwd);
           res.send("Trigger API : Email and Password Do Not Match"); 
          }
      }

      else{
        res.send("User " + email + " does not Exist in Database");
      }
      

  });
      
  });




  

})

module.exports = router;

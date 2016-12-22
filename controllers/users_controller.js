var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//this is the users_controller.js file


// this is the first page to load with /, it will render to signup handlebar under connect folder (auto set under views)
router.get('/', function(req,res) {
	console.log(res);
	res.render('connect/signup');

});

// on /log_out action it will redirect to /, which runs the above routing and renders(take user back) to signup page
router.get('/log_out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});


// login action, sequelize(runs our models user table, findOne - it searches the table to see if email column has the req.body.email content)
// if the table does not find it or equals null, it goes back to signup, if finds it (compare pw first and if pw is true) redirect to logged
// in page. Or else, go back to signup
router.post('/log_in', function(req, res) {
  models.user.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

		if (user == null){
			res.redirect('/')
		}

		
    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
     
        if (result == true){

        	
          req.session.logged_in = true;
          
		  req.session.name = user.firstname;

		  req.session.lastname = user.lastname;
					
          req.session.userid = user.id;
          
          req.session.email = user.email;

          req.session.photo = user.photo_url;

          req.session.wallpost = user.wallpost;
          console.log("===============================================================================================D")
          console.log(req.session.id);
          
          res.redirect('/home');
        }
        
        else{
					res.redirect('/');
				}
    });
  })
});


// on register action - sequelize, models user table will find to see if the email is in users table (can use both findOne or findAll)

router.post('/register', function(req,res) {
	models.user.findAll({
    where: {email: req.body.email}
  }).then(function(users) {

		if (users.length > 0){
			console.log(users)
			res.send('we already have an email or username for this account')
		}else{

			bcrypt.genSalt(10, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						
						
						models.user.create({
							firstname: req.body.firstname,
							lastname: req.body.lastname,
							email: req.body.email,
							password_hash: hash,
							age: req.body.age,
							company: req.body.company,
							position: req.body.position,
							industry: req.body.industry,
					        level: req.body.level,
					        photo_url: req.body.photo
						})
						
						.then(function(user){


							
		          req.session.logged_in = true;
		         
				  req.session.username = user.name;
							
		          req.session.userid = user.id;
		          
		          req.session.user_email = user.email;

		        
							res.redirect('/');
						});
					});
			});

		}
	});
});






// router.get('index', function(req, res) {
//   models.connect.findAll({
// 		include:[models.user]
//     where: [
// 	{position: req.body.position},
// 	{industry: req.body.industry},
// 	{level: req.body.level}
// 			]
//   }).then(function(connect) {

// 		res.render('index',{
// 			name:connect.name,
// 			email:connect.email,
// 			position:connect.position,
// 			industry:connect.industry,
// 			level:connect.level
// 		});
// 	  });
			
// 	});


module.exports = router;

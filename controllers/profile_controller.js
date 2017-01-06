var express = require('express');
var router = express.Router();
var models = require('../models');

// router.get('/', function (req, res) {
    
//     return res.render('connect/profile', {
//      name: req.session.name,
//      lastname: req.session.lastname,
//      photo: req.session.photo
//     });
// });

router.get('/', function (req, res) {
    var current_user;
    console.log(req.session);
    models.user.findOne({
        where: {
            id: req.session.userid
        }
    }).then(function(logged_in) {
        current_user = logged_in;
        return models.user.findAll({
            where: {friended: true,
                id: {
                    $ne: logged_in.id
                }
            }
        })  
    })
  .then(function(users) {
    // var candidates =[];
    // for ()

    return res.render('connect/profile', {
        name: req.session.name,
        lastname: req.session.lastname,
        photo: req.session.photo,
        wallpost: req.session.wallpost,
        logged_in:req.session.logged_in,
        similar:users,
        user:current_user
    });
   });
 });
// router.post('/', function (req, res) {
//  return res.render('connect/profile');
// })


router.post('/wallpost', function(req,res) {
    models.user.update({
        wallpost: req.body.wallpost },{
    where: {email: req.session.email}
  }).then(function(user){

            res.redirect('/profile');
        }, function(rejectedPromiseError){

        });


    
    });


router.post('/updateinfo', function(req,res) {
    models.user.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        company: req.body.company,
        position: req.body.position,
        industry: req.body.industry,
        level: req.body.level,
        photo_url:req.body.photo_url

         },{
    where: {email: req.session.email}
  }).then(function(user){

            res.redirect('/profile');
        }, function(rejectedPromiseError){

        });


    
    });



router.get('/aboutme', function(req,res) {
    console.log(res);
    res.render('connect/aboutme');

});


router.get('https://hack.chat/?{{name}}{{lastname}}', function(req,res){
   res.redirect('https://hack.chat/?{{name}}{{lastname}}');
})

module.exports = router;
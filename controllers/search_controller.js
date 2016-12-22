var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', function (req, res) {
    var current_user;
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    console.log(req.body.searched);
    models.user.findAll({
        where: {
            firstname: req.body.searched
        }
    }).then(function(users) {
    // var candidates =[];
    // for ()

    return res.render('connect/search', {
        firstname: users.firstname,
        lastname: users.lastname,
        photo: users.photo_url,
        wallpost: users.wallpost,
        email: users.email,
        age: users.age,
        company: users.company,
        position: users.position,
        industry: users.industry,
        level: users.level, 
        logged_in:users.logged_in,
        similar:users,
        user:current_user
    });
   });
 });


module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');


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
            where: {position: logged_in.position, industry: logged_in.industry, level: logged_in.level,
                id: {
                    $ne: logged_in.id
                }
            }
        })  
    })
  .then(function(users) {
    // var candidates =[];
    // for ()

    return res.render('connect/aboutme', {
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


module.exports = router;
var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', function (req, res) {
    var current_user;
    models.user.findOne({
       where:{ id: req.session.userid}
    }).then(function(logged_in) {
        current_user = logged_in;
        return models.user.findAll({
            where: {firstname:req.body.searched,
                id: {
                    $ne: logged_in.id
                }
            }
        })  
    })
  .then(function(users) {
    // var candidates =[];
    // for ()

    return res.render('connect/search', {
        name: req.session.name,
        lastname: req.session.lastname,
        email:req.session.email,
        photo:req.session.photo,
        logged_in:req.session.logged_in,
        similar:users,
        user:current_user

    });
  });
});




router.post('/friend', function(req,res){
    return models.user.update({
        friended:true
    },
    {where:{id:req.body.friended}
    })
    .then(function(friend){
        res.redirect('/home');
    })
})



module.exports = router;

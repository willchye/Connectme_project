var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req,res) {
    console.log(res);
    res.render('connect/connections');

});


module.exports = router;
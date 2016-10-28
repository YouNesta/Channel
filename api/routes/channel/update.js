var express = require('express');
var router = express.Router();
var config = require('../../config/config')
var jwt = require('jsonwebtoken');
var jwtAuth = require('express-jwt');
var mongoose = require('mongoose');
var colors = require('colors')
const util = require('util')
var User = require('../../models/user')



router.post('/categories', jwtAuth({ secret: config.secret}), function(req, res, next) {
    var token =  req.get('Authorization').replace("Bearer ", "");
    var decodedToken = jwt.decode(token);
    var id = mongoose.Types.ObjectId(req.body.id);

    User.findOneAndUpdate(
        {   _id:decodedToken.id,
            'channels.id': id
        },
        {   $set:{
            'channels.$.categories': req.body.categories
            }
        },
        function(err,result){
            if (err) {
                res.send({
                    success: false,
                    msg: 'Error for updating categories'
                })
            }
            res.send({
                success: true,
                msg: 'Success Update Categories'
            })
        });



});

module.exports = router;

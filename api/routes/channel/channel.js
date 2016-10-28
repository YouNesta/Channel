/**
 * Created by Nesta on 26/10/2016.
 */
var express = require('express');
var router = express.Router();
var channelModule = require('../../modules/channel');
var config = require('../../config/config')
var jwt = require('jsonwebtoken');
var jwtAuth = require('express-jwt');

var User = require('../../models/user')
var update = require('./update')


router.use(jwtAuth({ secret: config.secret}));

router.use('/update', update);



router.get('/', function(req, res, next) {
    var token =  req.get('Authorization').replace("Bearer ", "");
    var decodedToken = jwt.decode(token);



    User.findOne({_id:decodedToken.id}, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                msg: 'User not found.'
            });
        } else {
            user = user.toObject();
            channelModule.getChannels(user.channels, function(channels, err){
                if (err) {
                    res.send({
                        success: false,
                        msg: err
                    });
                }

                for(var n in channels){
                    for(var i in user.channels){
                        if(user.channels[i].id == channels[n].id){
                            channels[n].categories = user.channels[i].categories;
                        }
                    }
                }
                res.send({
                    success: true,
                    msg: 'Success Channels find',
                    data: channels
                })

            });

        }
    });
});


module.exports = router;

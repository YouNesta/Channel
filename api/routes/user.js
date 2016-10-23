var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});
router.post('/login', function(req, res, next) {
  var token = jwt.sign({ foo: 'bar' }, 'superSecret', { expiresIn:  60 });

  res.json({
    success: true,
    message: 'Enjoy your token!',
    auth_token: token
  });

});

module.exports = router;

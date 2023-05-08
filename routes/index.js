var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    success: true,
    message:"Thank you for reaching out to us"
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
// const PORT = process.env.PORT || 5000;

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;

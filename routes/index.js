var express = require('express');
var router = express.Router();
var test = require('./test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', test.init);
// router.get('/test/comments', test.comments);
router.get('/shuffle', test.shuffle);
router.get('/play', test.play);

module.exports = router;

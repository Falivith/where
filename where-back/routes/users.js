var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('HALO');
});

router.post('/', function(req, res, next) {
  res.send('HALO');
});

module.exports = router;

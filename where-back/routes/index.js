var express = require('express');
var router = express.Router();
const { usuarios } = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const {email} = req.body;
  const user = await usuarios.findOne({where: {email:email}})

  res.json(user)
});

module.exports = router;

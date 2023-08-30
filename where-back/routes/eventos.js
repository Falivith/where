const express = require('express');
const router = express.Router();
const { usuarios } = require('../models');
const {registerValidation} = require('../utils/validation')
const {validateToken} = require('../utils/JWT')


router.get('/', validateToken, async function(req,res,next) {
   res.send("valid");
});

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const { usuarios } = require('../models');

require('dotenv').config();

const bcrypt = require('bcrypt')
const {loginValidation} = require("../utils/validation");
const { createTokens } = require("../utils/JWT")

router.post('/', async function(req, res,next){
    // Validate fields
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Search email
    const user = await usuarios.findOne({ where: {email: req.body.email}});
    if (!user) return res.status(400).json("Usuário não encontrado");

    // Verify password
    const validPass = await bcrypt.compare(req.body.password, user.senha);
    if(!validPass) return res.status(400).json("Senha invalida");


    //Create Token
    const accessToken = createTokens(user);

    return res.status(200).cookie('where-access-token',
        accessToken,
        {maxAge: 60*60*24*1000})
        .json("Logado");
});

module.exports = router;


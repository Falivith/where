const express = require('express');
const router = express.Router();
const { usuarios } = require('../models');
const {registerValidation} = require('../utils/validation')
const bcrypt = require('bcrypt')
const {genSalt} = require("bcrypt");

router.post('/', async(req, res) => {

    // Validate fields
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    // Check if user is already in database
    const email = await usuarios.findOne({ where: {email: req.body.email}});
    if(email) {
        return res.status(400).json("E-mail já cadastrado.");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    usuarios.create({
        email: req.body.email,
        senha: hashPassword,
        nome: req.body.name,
        dataNasc: req.body.date
    });

    return res.status(200).json("Usuário criado com sucesso.");
})
module.exports = router;
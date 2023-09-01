const express = require('express');
const router = express.Router();
const { usuarios } = require('../models');
const {registerValidation} = require('../utils/validation')
const bcrypt = require('bcrypt')

router.post('/', async function(req, res, next) {

    // Validate fields
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({ isValidated:false, error:error.details[0].message});

    // Check if user is already in database
    const email = await usuarios.findOne({ where: {email: req.body.email}});
    if(email) {
        return res.status(400).json({isValidated:true, validEmail:false});
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    try {
        await usuarios.create({
            email: req.body.email,
            senha: hashPassword,
            nome: req.body.name,
            dataNasc: req.body.date
        });
        return res.status(200).json({
            isValidated:true,
            validEmail:true,
            isCreated:true});
    } catch (error){
        return res.status(400).json({
            isValidated:true,
            validEmail:true,
            isCreated:false,
            error});
    }


})
module.exports = router;


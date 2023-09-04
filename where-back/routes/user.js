const express = require('express');
const router = express.Router();
const { participam, eventos} = require('../models');
const {registerValidation} = require('../utils/validation')
const bcrypt = require('bcrypt')
const {validateToken} = require("../utils/JWT");

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

router.get('/confirmed', validateToken, async function(req, res, next) {

   const codEvents = await participam.findAll({attributes:['codEvento_fk'], where:{email_fk:req.username}});

   const listEvents = await eventos.findAll({where: {codEvento_fk:codEvents, confirmado:true}});
   listEvents.email_fk = undefined;

   return res.status(200).json(listEvents);
})



module.exports = router;


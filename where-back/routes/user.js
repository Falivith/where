const express = require('express');
const router = express.Router();
const { participam, eventos, usuarios, promoters} = require('../models');
const {registerValidation, editUserValidation} = require('../utils/validation')
const bcrypt = require('bcrypt')
const {validateToken} = require("../utils/JWT");

router.get('/', validateToken, async function(req,res,next) {
    try {
        const user = await usuarios.findOne({where: {email: req.username}});
        if(!user) return res.json("rroer")

        return res.status(200).json({
            cpf: user.cpf,
            nome: user.nome,
            foto: user.foto,
            descricao: user.descricao,
            dataNasc: user.dataNasc,
            email: user.email
        })
    } catch (error){
        return res.status(400).json(error);
    }
})

router.post('/create', async function(req, res, next) {

    //Create flags


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
        return res.status(200).json({isCreated:true});
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

router.put('/edit', validateToken, async function(req,res,next){

    // Create flags
    req.responseJson.isValidated = false;
    req.responseJson.isEdited = false;

    //Validate input
    const {error} = editUserValidation(req.body);
    if(error) {
        req.responseJson.error = error.details[0].message;
        return res.status(400).json(req.responseJson);
    }

    try {
        await usuarios.update({
            nome: req.body.nome,
            cpf: req.body.cpf,
            descricao: req.body.descricao,
            dataNasc: req.body.dataNasc,
        }, {where: {
                email_fk: req.username
                }})
        return res.status(200).json({isEdited: true});
    } catch(error) {
        return res.status(400).json(req.responseJson);
    }
})

router.delete('/', validateToken, async function(req, res, next) {

   try {
       await usuarios.destroy({ where: {
           email_fk: req.username;
           }
       })
       return res.status(200).json({isDeleted:true});
   } catch (error) {
       return res.status(400).json({isDeleted:false});
   }
})

router.post('/upgrade', validateToken, async function(req,res,next){

    //Verify if user is already promoter
    const isPromoter = await promoters.findOne({where :{email_fk:req.username}})
    if(isPromoter) return res.status(400).json("User already is a promoter.");

    try {
        await promoters.create({
            email_fk: req.username
        });
        return res.status(200).json("User upgraded.")
    } catch (error){
        return res.status(400).json(error);
    }
})



module.exports = router;


const express = require('express');
const router = express.Router();
const { usuarios, promoters} = require('../models');
const {registerValidation} = require('../utils/validation')
const {validateToken} = require('../utils/JWT')


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
router.post('/upgrade', validateToken, async function(req,res,next){

    //Verify if user is already promoter
    const isPromoter = promoters.findOne({where :{email_fk:req.username}})
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
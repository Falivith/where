const express = require('express');
const router = express.Router();
const { locais,eventos, promoters} = require('../models');
const {registerValidation} = require('../utils/validation')
const {validateToken} = require('../utils/JWT')



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
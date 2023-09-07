const express = require('express');
const router = express.Router();
const { participam,eventos, promoters} = require('../models');
const {validateToken} = require('../utils/JWT')
const {eventUpdateValidation,eventValidation} = require('../utils/validation')


router.get('/', validateToken, async function(req, res, next) {


    const part = participam.findOne({where: {email_fk:req.username, codEvento_fk:req.body.codEvento}});

    if(!part) return res.status(200).json({
        interested:false,
        confirmed:false
    });

    if(part.confirmado == true) return res.status(200).json({
        interested:false,
        confirmed:true
    })

    return res.status(200).json({
        interested:true,
        confirmed:false
    })

})





module.exports = router;
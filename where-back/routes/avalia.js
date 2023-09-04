const express = require('express');
const router = express.Router();
const moment = require('moment');
const { avalia,eventos} = require('../models');
const {validateToken} = require('../utils/JWT')
const {avaliaValidation} = require('../utils/validation')


router.get('/all', async function(req, res, next) {
    console.log("aaa")

    //Create flags
    req.responseJson.isEvent = false;

    // Verify if event exists
    const event = eventos.findByPk(req.body.codEvento);
    if(!event) return res.status(400).json(req.responseJson);

    // Get all ratings
    try {
        const ratingList = await avalia.findAll({
            attributes: ["comentario", "rating", "horario"],
            where: {codEvento_fk: req.body.codEvento},
            order: ["horario", 'DESC']
        })

        return res.status(200).json(ratingList);
    } catch(error){
        return res.status(400).json({error:'Database Error'})
    }
})

router.post('/', validateToken, async function(req, res, next) {


    // Validate
    const{error} = avaliaValidation(req.body);
    if(error) {
        req.responseJson.error = error.details[0].message;
        return res.status(400).json(req.responseJson);
    }

    // Verify if event exists
    const event = eventos.findByPk(req.body.codEvento_fk);
    if(!event) return res.status(400).json(req.responseJson);

    try {
        await avalia.create({
            codEvento_fk: req.body.codEvento_fk,
            email_fk: req.username,
            rating: req.body.rating,
            horario: moment().format("YYYY-MM-DD HH:mm:ss"),
            comentario: req.body.comentario
        })
        return res.status(200).json({isCreated:true});
    } catch(error) {
        req.responseJson.error = error.errors[0].message;
        return res.status(400).json(req.responseJson);
    }
})

router.get('/', validateToken, async function(req, res, next) {

    try {
        const rating = await avalia.findOne({
            attributes:[
              "comentario",
              "rating",
              "horario"
            ],
            where:
                {
                    codEvento_fk: req.body.codEvento_fk,
                    email_fk: req.username
                }
        })

        if (!rating) return res.status(400).json({hasRating: false});

        return res.status(400).json()
    } catch(error){
        return res.status(400).json({error:error});
    }
})

router.delete('/', validateToken, async function(req, res, next) {

    try {
        avalia.destroy({where: {
            codEvento_fk: req.body.codEvento_fk,
            email_fk: req.username
            }})
    } catch(error) {
        return req.status(400).json({error:error});
    }
})


module.exports = router;
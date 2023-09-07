const express = require('express');
const router = express.Router();
const moment = require('moment');
const { avalia,eventos} = require('../models');
const {validateToken} = require('../utils/JWT')
const {avaliaValidation} = require('../utils/validation')
const {Sequelize} = require("sequelize");


//Get list of ratings+comment+datime of a certain event
router.get('/all', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isEvent = false;

    // Verify if event exists
    const event = eventos.findByPk(req.body.codEvento);
    if(!event) return res.status(400).json(req.responseJson);

    // Validate entry

    // Get all ratings
    try {
        const ratingList = await avalia.findAll({
            attributes: ["comentario", "rating", "horario"],
            where: {codEvento_fk: req.body.codEvento},
            order: [["horario", 'DESC']]
        })

        return res.status(200).json(ratingList);
    } catch(error){
        return res.status(400).json({error:'Database Error'})
    }
})

// Create rating
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

    // Verify if user has rating


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

// Update rating
router.put('/', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isValidated = false;
    req.responseJson.isEvent = false;
    req.responseJson.isDeleted = false;


    // Validate
    const{error} = avaliaValidation(req.body);
    if(error) {
        req.responseJson.error = error.details[0].message;
        return res.status(400).json(req.responseJson);
    }
    req.responseJson.isValidated = true;

    // Verify if event exists
    const event = eventos.findByPk(req.body.codEvento_fk);
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    try {
        await avalia.destroy({where: {
            codEvento_fk: req.body.codEvento_fk
            }
        })
        return res.status(200).json({isDeleted:true})
    } catch(error) {
        return res.status(400).json(req.responseJson);
    }
    
})

//Find rating from x user and y event
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

        return res.status(200).json({hasRating:true, rating:rating});
    } catch(error){
        return res.status(400).json({error:error});
    }
})


//Delete rating + comment
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

//Average rating of event
router.get('/average', validateToken, async function(req,res,next) {

    //Create flags
    req.responseJson.isEvent = false;

    // Verify if event exists
    const event = await eventos.findByPk(req.body.codEvento_fk);
    if(!event) return res.status(400).json(req.responseJson);

    try {
        const numberOfRatings = await avalia.count({
            where: {codEvento_fk: req.body.codEvento_fk}
        })
        console.log(numberOfRatings);
        if(numberOfRatings > 0) {
            const average = await avalia.findOne({
                where: {codEvento_fk: req.body.codEvento_fk},
                attributes: [Sequelize.fn("AVG", Sequelize.col("rating"))],
                raw:true
            })
            console.log(average);
            return res.status(200).json({numberOfRatings:numberOfRatings, average:average['AVG(`rating`)']});
        } else {
            return res.status(200).json({numberOfRatings:0})
        }

    } catch(error) {
        return res.status(400).json({error:error});
    }
})


module.exports = router;
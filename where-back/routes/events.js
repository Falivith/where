const express = require('express');
const router = express.Router();
const { participam,eventos, promoters,avalia} = require('../models');
const {validateToken} = require('../utils/JWT')
const {eventUpdateValidation,eventValidation} = require('../utils/validation')
const {Sequelize, Op} = require("sequelize");
const {valid} = require("joi");
const moment = require('moment');


// READ: Get all future and current events
//
// JSON INPUT - Not necessary
router.get('/all', validateToken, async function(req,res,next) {
   try {
      // get all events from database
      const listEventos = await eventos.findAll({
          attributes : {exclude: ['email_fk']},
          where : {
              fim : {
                  [Op.gt] : moment().format("YYYY-MM-DD HH:mm:ss")
              }
          }
      });
      return res.status(200).json(listEventos);
   } catch(error){
       req.responseJson.error = error;
      return res.status(400).json(req.responseJson);
   }
});

// READ: Get subevents from x event
//
// JSON INPUT
//
// - {"codEvento_fk": "id do evento pai"}
router.get('/sub', validateToken, async function(req, res, next) {

    //Create flag
    req.responseJson.isEvent = false;

    //Get event
    const event = await eventos.findByPk(req.body.codEvento_fk);

    // Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    try {
        const listSubEvents = await eventos.findAll({
            where : {codEvento_fk: req.body.codEvento_fk}
        });
        return res.status(200).json(listSubEvents);

    } catch(error) {
        req.responseJson.message = "Database error";
        req.responseJson.error = error
        return res.status(400).json(req.responseJson);
    }

})


// READ: Get events where logged user is the creator/owner
//
// JSON INPUT NOT NECESSARY
router.get('/user', validateToken, async function(req, res, next){

   // Create flag
   req.responseJson.listEvents = null;

   try {
      // Get all events of a LOGGED USER from database
      const listEvents = await eventos.findAll({
         where: {
            email_fk: req.username
         }
      })
       //Remove email from response
      listEvents.forEach(event => event.email_fk = undefined);
      return res.status(200).json({listEvents: listEvents});
   } catch (error) {
       req.responseJson.error = error
      return res.status(400).json(req.responseJson);
   }

})

// CREATE: Create Event
//
// JSON INPUT - FALTA ADICIONAR FOTO
//
// {
//          "descricao": "STRING",
//          "nome": "STRING",
//          "endereco": "STRING",
//          "inicio": "DATE YYYY-MM-DD",
//          "fim": "DATE YYYY-MM-DD",
//          "codEvento_fk": "ID DO EVENTO PAI",
//          "latitude_fk": "latitude 90.x ~~ -90.xx",
//          "longitude_fk": "Longitude  180.x ~~ -180.xxx",
//          "horario": "DATETIME YYYY-MM-DD HH:mm:ss",
//          "estabelecimento": "STRING"
//   }
router.post('/', validateToken, async function(req,res,next){

    //Create flags
    req.responseJson.isPromoter = false;
    req.responseJson.isValidated = false;
    req.responseJson.isCreated = false;

   //Verfiy if user is promoter
   const isPromoter = await promoters.findOne({where :
          {email_fk: req.username} });
   if(!isPromoter) return res.status(400).json(req.responseJson);
   req.responseJson.isPromoter = true;

   //Verify input
   const {error} = eventValidation(req.body);
   if (error) {
       req.responseJson.error = error.details[0].message;
       return res.status(400).json(req.responseJson);
   }
   req.responseJson.isValidated = true;

   try {
         await eventos.create({
         descricao: req.body.descricao,
         nome: req.body.nome,
         endereco: req.body.endereco,
         inicio: req.body.inicio,
         fim: req.body.fim,
         email_fk: req.username,
         codEvento_fk: req.body.codEvento_fk,
         latitude_fk: req.body.latitude_fk,
         longitude_fk: req.body.longitude_fk,
         horario: req.body.horario,
         estabelecimento: req.body.estabelecimento
      }).then(
          evento => {
              return res.status(200).json({isCreated:true, id:evento.codEvento});
          }
          );
   } catch (error){
      req.responseJson.error = error;
      return res.status(400).json(req.responseJson);
   }
})

// READ: Get X event
//
// JSON INPUT
//
// {
//      "codEvento" : "ID DO EVENTO"
// }
router.get('/', validateToken, async  function(req, res, next) {
    //Create flag
    req.responseJson.isEvent = false;

    //Get event
    const event = await eventos.findByPk(req.body.codEvento);

    // Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    //Remove email value from response
    event.email_fk = undefined;
    return res.status(200).json(event);
})

//UPDATE: Update event information
//
// JSON INPUT
// {
//          "descricao": "STRING",
//          "nome": "STRING",
//          "endereco": "STRING",
//          "inicio": "DATE YYYY-MM-DD",
//          "fim": "DATE YYYY-MM-DD",
//          "latitude_fk": "latitude 90.x ~~ -90.xx",
//          "longitude_fk": "Longitude  180.x ~~ -180.xxx",
//          "horario": "DATETIME YYYY-MM-DD HH:mm:ss",
//          "estabelecimento": "STRING"
//   }
router.put('/', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isEvent = false;
    req.responseJson.isOwner = false;
    req.responseJson.isPromoter = false;
    req.responseJson.isValidated = false;
    req.responseJson.isUpdated = false;

    //Get event
    const event = await eventos.findByPk(req.body.codEvento);

    // Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    //Verify if user is event owner
    if(event.email_fk != req.username) return res.status(400).json(req.responseJson);
    req.responseJson.isOwner = true;


    //Verify input
    const {error} = eventUpdateValidation(req.body);
    if (error) {
        req.responseJson.error = error.details[0].message;
        return res.status(400).json(req.responseJson);
    }
    req.responseJson.isValidated = true;

    try {
        // Try to update event
        await eventos.update({
            descricao: req.body.descricao,
            nome: req.body.nome,
            endereco: req.body.endereco,
            inicio: req.body.inicio,
            fim: req.body.fim,
            latitude_fk: req.body.latitude_fk,
            longitude_fk: req.body.longitude_fk,
            horario: req.body.horario,
            estabelecimento: req.body.estabelecimento
        }, {
            where: {codEvento: req.params.id}
        });
        return res.status(200).json({isUpdated: true});

    } catch (error){
        req.responseJson.error = error
        return res.status(400).json(req.responseJson);
    }


})

//Delete event
//
// JSON INPUT
//
// {
//      "codEvento": "ID DO EVENTO"
// }
router.delete('/', validateToken, async function(req, res,next) {

    //Create flags
    req.responseJson.isEvent = false;
    req.responseJson.isOwner = false;
    req.responseJson.isDeleted = false;

    //Get event
    const event = await eventos.findByPk(req.body.codEvento);

    // Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    //Verify if user is owner
    if(event.email_fk != req.username) return res.status(400).json(req.responseJson);

    try {
        //Try to delete event
        await eventos.destroy({
            where: { codEvento: req.params.id}
        });
        //Return success
        return res.status(200).json({isDeleted:true});
    } catch(error) {
        res.status(400).json(req.responseJson);
    }
})

// READ: Get number of interested users
//
// JSON INPUT
//
// {
//      "codEvento": "ID DO EVENTO"
// }
router.get('/interested', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isEvent = false;

    //Get event
    const event = await eventos.findByPk(req.body.codEvento);

    //Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    try {
        const numberOfInterested = participam.count({where: {
            codEvento_fk: req.body.codEvento_fk,
            email_fk: req.username,
            confirmado: false
            }})
        return res.status(200).json({numberOfInterested: numberOfInterested});
    } catch(error) {
        req.responseJson.error = error;
        return res.status(400).json(req.responseJson);
    }

})

// READ: Get number of confirmed users
//
// JSON INPUT
//
// {
//      "codEvento": "ID DO EVENTO"
// }
router.get('/confirmed', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isEvent = false;

    //Get event
    const event = await eventos.findByPk(req.params.id);

    //Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    try {
        const numberOfInterested = participam.count({where: {
                codEvento_fk: req.body.codEvento_fk,
                email_fk: req.username,
                confirmado: true
            }})
        return res.status(200).json({numberOfInterested: numberOfInterested});
    } catch(error) {
        req.responseJson.error = error;
        return res.status(400).json(req.responseJson);
    }
})



module.exports = router;
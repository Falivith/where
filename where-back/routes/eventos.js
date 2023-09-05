const express = require('express');
const router = express.Router();
const { participam,eventos, promoters} = require('../models');
const {validateToken} = require('../utils/JWT')
const {eventUpdateValidation,eventValidation} = require('../utils/validation')


router.get('/', validateToken, async function(req,res,next) {
   try {
      // get all event from database
      const listEventos = await eventos.findAll({attributes : {exclude: ['email_fk']}});
      return res.status(200).json({auth:true, listEventos});
   } catch(error){
      return res.status(400).json({auth:true, error});
   }
});

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
      return res.status(200).json({auth:true, listEvents: listEvents});
   } catch (error) {
      return res.status(400).json({auth:true, error});
   }

})

router.post('/create', validateToken, async function(req,res,next){

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

   try {
         await eventos.create({
         descricao: req.body.descricao,
         nome: req.body.nome,
         endereco: req.body.endereco,
         inicio: req.body.inicio,
         fim: req.body.fim,
         email_fk: req.username,
         codEvento_fk: req.body.codEvento_fk,
         latitude_fk: req.body.latitude,
         longitude_fk: req.body.longitude,
         horario: req.body.horario,
         estabelecimento: req.body.estabelecimento
      }).then(
          evento => {
              req.responseJson.isCreated = true;
              req.responseJson.id = evento.codEvento;
              return res.status(200).json(req.responseJson);
          }
          );
   } catch (error){
      req.responseJson.error = error;
      return res.status(400).json(req.responseJson);
   }
})

router.get('/id/:id', validateToken, async  function(req, res, next) {
    //Create flag
    req.responseJson.isEvent = false;

    //Get event
    const event = await eventos.findByPk(req.params.id);

    // Verify if event exists
    if(!event) return res.status(400).json(req.responseJson);
    req.responseJson.isEvent = true;

    //Remove email value from response
    event.email_fk = undefined;
    return res.status(200).json(event);
})

router.put('/id/:id', validateToken, async function(req, res, next) {

    //Create flags
    req.responseJson.isEvent = false;
    req.responseJson.isOwner = false;
    req.responseJson.isPromoter = false;
    req.responseJson.isValidated = false;
    req.responseJson.isUpdated = false;

    //Get event
    const event = await eventos.findByPk(req.params.id);

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
        req.responseJson.isUpdated = true;
        return res.status(200).json(req.responseJson);

    } catch (error){
        req.responseJson.error = error
        return res.status(400).json(req.responseJson);
    }


})

router.delete('/id/:id', validateToken, async function(req, res,next) {

    //Create flags
    req.responseJson.isEvent = false;
    req.responseJson.isOwner = false;
    req.responseJson.isDeleted = false;

    //Get event
    const event = await eventos.findByPk(req.params.id);

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




module.exports = router;
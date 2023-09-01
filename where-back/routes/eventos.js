const express = require('express');
const router = express.Router();
const { participam, locais,eventos, promoters} = require('../models');
const {registerValidation} = require('../utils/validation')
const {validateToken} = require('../utils/JWT')
const {eventValidation} = require('../utils/validation')


router.get('/', validateToken, async function(req,res,next) {
   try {
      // get all event from database
      const listEventos = await eventos.findAll({ attributes : {exclude: ['email_fk']}});
      return res.status(200).json(listEventos);
   } catch(error){
      return res.status(400).json(error);
   }
});

router.get('/user', validateToken, async function(req, res, next){
   try {
      // Get all events of a LOGGED USER from database
      const listEventos = await eventos.findAll({
         where: {
            email_fk: req.username
         }
      })
      return res.status(200).json(listEventos);
   } catch (error) {
      return res.status(400).json(error);
   }

})

router.post('/create', validateToken, async function(req,res,next){
   //Verfiy if user is promoter
   const isPromoter = await promoters.findOne({where :
          {email_fk: req.username} });
   if(!isPromoter) return res.status(400).json({isPromoter: false});

   //Verify input
    const {error} = eventValidation(req.body);
   if (error) return res.status(400).json({isPromoter:true, isValidated: false, error:error.details[0].message})

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
          evento => {return res
              .status(200)
              .json({
                  isPromoter: true,
                  isValidated: true,
                  isCreated: true,
                  id:evento.codEvento})});
   } catch (error){
      return res.status(400).json({isPromoter: true, isValidated:true, isCreated:false, error});
   }
})

router.get('/:id', validateToken, async  function(req, res, next) {

    //Get event
    const event = await eventos.findByPk(req.params.id);

    // Verify if event exists
    if(!event) return res.status(400).json({isEvent:false});

    event.email_fk = undefined;
    return res.status(200).json({isEvent:true, event:event});
})

router.get('/interested', validateToken, async function(req, res, next) {


})


module.exports = router;
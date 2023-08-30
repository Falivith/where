const express = require('express');
const router = express.Router();
const { locais,eventos, promoters} = require('../models');
const {registerValidation} = require('../utils/validation')
const {validateToken} = require('../utils/JWT')


router.get('/', validateToken, async function(req,res,next) {
   try {
      const listEventos = await eventos.findAll();
      return res.status(200).json(listEventos);
   } catch(error){
      return res.status(400).json(error);
   }
});

router.get('/seuseventos', validateToken, async function(req, res, next){
   try {
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

router.post('/criarevento', validateToken, async function(req,res,next){
   //Verfiy if user is promoter
   const isPromoter = await promoters.findOne({where :
          {email_fk: req.username} });
   if(!isPromoter) return res.status(400).json({isPromoter: false});

   // try {
   //    eventos.create({
   //       codEvento: req.body.codEvento,
   //       descricao: req.body.descricao,
   //       nome: req.body.nome,
   //       endereço: req.body.endereço,
   //       inicio: req.body.inicio,
   //       fim: req.body.fim,
   //       email_fk: req.body.email_fk,
   //       codEvento_fk: req.body.codEvento_fk,
   //       latitude_fk: req.body.latitude_fk,
   //       longitude_fk: req.body.longitude_fk,
   //       horario: req.body.horario
   //    })
   // } catch (error){
   //    return res.status(400).json({isPromoter: true, error});
   // }
})
module.exports = router;
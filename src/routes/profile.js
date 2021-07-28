const express = require('express');
const Router  = express.Router();
const controller = require('../controllers/controller')

Router.use(function timeLog(req,res,next){
    next();
})

Router.get('/', async(req,res)=>{
   let result = await controller.getProfiles()
   res.send(result);
})

Router.get('/:email', async(req,res)=>{
    let email = req.params.email
    let result = await controller.getProfileByEmail(email)
   res.send(result);
})

Router.post('/', async(req,res)=>{
    let profile = req.body;
    let result = await controller.insertProfile(profile)
   res.send(result);
})

Router.delete('/:email', async(req,res)=>{
    let email = req.params.email
    let result = await controller.deleteProfile(email)
   res.send(result);
})

module.exports = Router;
const express = require('express');
const { Genre,validate } = require('../models/genre');
const router  = express.Router();
// const asyncError =require('../middleware/asyncError')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
const objectId=require('../middleware/objectId')

router.get('/',auth,async(req,res)=>{
  let genre = await Genre.find();
  res.send(genre)
})
router.get('/:id',objectId,async(req,res)=>{
    let genre = await Genre.findById(req.params.id)
    res.send(genre)
})
router.post('/',async(req,res)=>{
   let {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message)
  
   let genre= new Genre({
       name:req.body.name
   })
   genre= await genre.save();
   res.send(genre)
})
router.put('/:id',objectId,async(req,res)=>{
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let genre = await Genre.findById(req.params.id);
    genre.set({
      name:req.body.name
    })
    genre = await genre.save()

    res.send(genre);

})
router.delete('/:id',[objectId,auth,admin],async(req,res)=>{
      const genres=await Genre.findByIdAndDelete(req.params.id)
      res.send(genres);
})
module.exports= router;
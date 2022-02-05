const express = require('express');
const router =express.Router();
const Joi = require("joi");
const auth = require('../middleware/auth');
const { Movie } = require('../models/movie');
const { Rental } = require('../models/rental');
const moment = require('moment')
const validate = (validator)=>{
      return (req,res,next)=>{
            let {error} = validator(req.body)
            if(error) return res.status(400).send(error.details[0].message);
            next()
      }
      
      
}

router.post('/',[auth,validate(validateReturns)],async(req,res)=>{
  let rental = await Rental.findOne({
        "user._id":req.body.userId,
        "movie._id":req.body.movieId
   })
   if(!rental) return res.status(404).send("Rental is not found");
   rental.dateReturned=new Date();
   rental.rentalFee=moment().diff(rental.dateOut,"days")*rental.movie.dailyRentalRate;
   await rental.save();

   await Movie.updateOne({_id:req.body.movieId},{
        $inc:{numberInstock:-1}
   })
   res.status(200).send(rental);
})

function validateReturns(returns){
    const schema=Joi.object({
        userId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(returns)
}
module.exports=router;
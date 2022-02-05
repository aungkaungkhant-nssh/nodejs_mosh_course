const express=require('express');
const router=express.Router();
const {Rental,validate}=require('../models/rental')

const { Movie } = require('../models/movie');
const {User} =require("../models/user")
const Fawn=require('fawn')
Fawn.init("mongodb://127.0.0.1:27017/nodejs_movieApi")

router.get('/',async(req,res)=>{
    
})

router.post("/",async(req,res)=>{
    let {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findById(req.body.userId);
    if(!user) return res.status(404).send("User is not found");

    let movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send("Movie is not found");

    let rental=new Rental({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        movie:{
            _id:movie._id,
            name:movie.name,
            dailyRentalRate:movie.dailyRentalRate
        }
    })

    try{
       await new Fawn.Task()
       .save('rentals',rental)
       .update('movies',{_id:movie._id},{$inc:{numberInstock:-1}})
       .run()
       res.send(rental)
    }catch(err){
        res.status(500).send("Something went wrong")
    }

    
})

module.exports=router;
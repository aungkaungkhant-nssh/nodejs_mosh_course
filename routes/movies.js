const express= require("express");
const { Genre } = require("../models/genre");
const router= express.Router();
const {Movie,validate}=require('../models/movie')
router.get('/',async(req,res)=>{
    const movie=await Movie.find();
    res.send(movie)
})

router.post('/',async(req,res)=>{
     const {err} = validate(req.body);
     if(err) return res.status(400).send(err.details[0].message)

     let genre =await Genre.findById(req.body.genreId);
     if(!genre) return res.status(404).send("Genre is not found");

    let movie=new Movie({
        name:req.body.name,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInstock:req.body.numberInstock,
        dailyRentalRate:req.body.dailyRentalRate,
    })
    movie = await movie.save();
    res.send(movie)
})

module.exports=router;
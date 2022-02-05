const mongoose=require('mongoose');
const {genreSchema}=require('./genre');
const Joi = require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInstock:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255,
    }
})

const Movie=mongoose.model("Movie",movieSchema);

function movieValidate(movie){
    const schema = Joi.object({
        name:Joi.string().required().min(5).max(50),
        genreId:Joi.objectId().required(),
        numberInstock:Joi.number().required().min(0).max(255),
        dailyRentalRate:Joi.number().required().min(0).max(255)
    })
    return schema.validate(movie)
}

exports.validate=movieValidate;
exports.Movie=Movie;
exports.movieSchema=movieSchema
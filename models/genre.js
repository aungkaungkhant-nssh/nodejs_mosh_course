const mongoose=require('mongoose');
const Joi=require('joi')
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    }
})

const Genre=mongoose.model("Genre",genreSchema);

const genreValidate=(genre)=>{
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50)
    })
    return schema.validate(genre)
}

exports.Genre=Genre;
exports.genreSchema=genreSchema;
exports.validate=genreValidate;
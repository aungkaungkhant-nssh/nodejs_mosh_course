const mongoose=require('mongoose');
const Joi =require('joi')
Joi.objectId=require('joi-objectid')(Joi)
const rentalSchema=new mongoose.Schema({
    user:{
        type:new mongoose.Schema({
            name:{
                type:String,
                minlength:5,
                maxlength:50,
                required:true,
            },
            email:{
                type:String,
                required:true,
                unique:true,
                minlength:5,
                maxlength:255
            }
        }),
        required:true,
    },
    movie:{
       type:new mongoose.Schema({
           name:{
            type:String,
            required:true,
            minlength:5,
            maxlength:50
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255,
            }
       }),
       required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now()
    },
    dateReturned:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0
    }
})

const Rental=mongoose.model("Renatl",rentalSchema);

function rentalValidate(rental){
    const schema=Joi.object({
        userId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(rental)
}

exports.Rental=Rental;
exports.validate=rentalValidate;
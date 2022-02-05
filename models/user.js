const Joi = require('joi');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const userSchema=new mongoose.Schema({
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
     },
     password:{
         type:String,
         required:true,
         minlength:5,
         maxlength:255
     },
     isAdmin:{
         type:Boolean
     }
})
userSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_KEY);
}
const User=mongoose.model("User",userSchema);

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().required().min(5).max(50),
        email:Joi.string().required().min(5).max(255),
        password:Joi.string().required().min(5).max(255),
    })
    return schema.validate(user)
}
exports.User=User;
exports.validate=validateUser;
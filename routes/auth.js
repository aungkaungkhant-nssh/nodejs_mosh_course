const express = require("express");
const router = express.Router();
const Joi=require('joi')
const {User} = require('../models/user')
const bcrypt=require('bcrypt')

router.post('/',async(req,res)=>{
    let {error} = authValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email:req.body.email});
   if(!user) return res.status(400).send("Invalid email or password...");

   const isValid=await bcrypt.compare(req.body.password,user.password);
   if(!isValid) return res.status(400).send("Invalid email or password...");

   let token = user.generateToken();

   res.header("x-auth-token",token).send(user);
})


function authValidate(user){
    const schema = Joi.object({
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(5).max(255)
    })
    return schema.validate(user);
}

module.exports=router;
const express = require("express");
const router=express.Router();
const {User,validate} =require('../models/user')
const _=require('lodash')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
router.get('/',async(req,res)=>{
    const user=await User.find();
    res.send(user);
})

router.post('/',async(req,res)=>{
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("Email already exist");

    user=new User(_.pick(req.body,["name","email","password"]));
    let salt= await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    user=await user.save();
    let token=user.generateToken();
    res.header("x-auth-token",token).send(user);
})

module.exports=router;
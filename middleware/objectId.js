const mongoose=require('mongoose')
module.exports=function(req,res,next){
   let valid= mongoose.Types.ObjectId.isValid(req.params.id);
   if(!valid) return res.status(404).send("Invalid ");
   next();
}
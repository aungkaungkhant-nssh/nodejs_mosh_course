let jwt=require('jsonwebtoken')
module.exports=function(req,res,next){
    let token=req.header("x-auth-token");
    if(!token) return res.status(401).send("Access denied no provided token....");

    try{
        let decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user=decoded;
        next()
    }catch(err){
        res.status(400).send("Invalid token....")
    }
}
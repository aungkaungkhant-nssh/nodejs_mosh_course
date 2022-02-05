const mongoose=require('mongoose');
const config=require('config')
module.exports=function(logger){
    const db=config.get("db")
    mongoose.connect(db)
            .then(()=>logger.info(`Connected to ${db}...`))
            .catch((err)=>console.log(err.message))
}
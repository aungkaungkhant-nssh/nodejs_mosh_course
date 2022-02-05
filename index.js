require('express-async-errors')
const express=require('express');
const app=express();
const logger=require('./startup/logger')
require('./startup/db')(logger);
require('./startup/routes')(app)
require('./startup/logging')()

require('dotenv').config()
let server = app.listen(5000,function(){
    console.log("Server is running on port 5000")
})

module.exports=server
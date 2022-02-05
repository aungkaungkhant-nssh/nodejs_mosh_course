const db = require("./data");
const email =require('./email')
module.exports.absolute=function(num){
   return  num >=0 ? num : -num;
}

module.exports.greeting=function(string){
    return `Hello ${string}`
}

module.exports.currency=function(currency){
    return ["AUD","SGD","KYAT"]
}

module.exports.products=function(id){
    return {id,name:"chees"}
}

module.exports.registerUser=function(username){
    if(!username) throw new Error("username is required");
    return {id:1,username}
}

module.exports.applyDiscount=function(customerId){
    let customer = db.getCustomerSync(1);

    let order={price:10}
    if(customer.point>10)
        order.price*=0.9

    return order.price  

}
module.exports.sendEmail=function(customerId){
    let customer = db.getCustomerSync(1);
    email.send(customer.email,"Hello world");
}
const {User} = require('../../../models/user')
const mongoose =require('mongoose')
const jwt = require('jsonwebtoken')
const auth = require('../../../middleware/auth')
describe("auth test",()=>{
    it("should populate req.user with the payload of a valid jwt",()=>{
        let user ={_id:new mongoose.Types.ObjectId(),isAdmin:true}
        let token = new User(user).generateToken();
        
        let result =  jwt.verify(token,process.env.JWT_KEY)

        let req={
            header:jest.fn().mockReturnValue(token)
        }
        let res;
        let next=jest.fn();

        auth(req,res,next)

        expect(result).toMatchObject(req.user)
        expect(result).toBeDefined()
    })
})
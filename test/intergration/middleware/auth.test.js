
let request =  require("supertest");
const { User } = require("../../../models/user");
let server;
describe('auth test', () => {
    beforeEach(()=>{server=require('../../../index')})
    afterEach(async()=> {
       await server.close()
     
    })
    let token;
    let exec=()=>{
        return request(server).get("/api/genres").set('x-auth-token',token)
    }
    beforeEach(()=>{
        token=new User().generateToken()
    })
    it("should return 401 if no token is provided",async()=>{
        token="";
       let res= await exec();
       expect(res.status).toBe(401)
    })
    it("should return 400 if a token is invalid",async()=>{
        token="a";
        let res = await exec();
        expect(res.status).toBe(400)
    })
    it("should return 200 if valid token",async()=>{
        let res= await exec();
        expect(res.status).toBe(200)
    })
});

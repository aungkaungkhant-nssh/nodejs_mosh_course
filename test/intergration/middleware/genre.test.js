const request = require('supertest');
const { Genre } = require('../../../models/genre');
const { User } = require('../../../models/user');
const mongoose = require('mongoose')

describe("/api/movies",()=>{
    let token;
    beforeEach(()=> {server = require('../../../index')})
    afterEach(async()=>{
       await server.close()
        await Genre.remove({})
       
        
    })
    beforeEach(()=>{
        token = new User().generateToken();
    })
    describe('/GET', () => {
        it("should return all movies",async()=>{
             await Genre.collection.insertMany([
                 {name:"romatic"},
                 {name:"action"}
             ])
            let res =await request(server).get('/api/genres').set("x-auth-token",token)
             
            expect(res.status).toBe(200);
        })
    });
    describe('/GET :id', () => {
        it("should return genres when input in valid id",async()=>{
            // let genre = await request(server).post("/api/genres").send({name:"romatic"})
            let genre= new Genre({
                name:"romatic"
            })
            genre= await genre.save();

           let res = await request(server).get('/api/genres/'+genre._id).set("x-auth-token",token)

           expect(res.status).toBe(200)
        })
    });
    
    describe('/POST', () => {
        it("should return 400 if a genre name is less than 5",async()=>{
           let res = await request(server).post('/api/genres/').send({name:"ro"})

           expect(res.status).toBe(400)
        })
    });
    describe('/POST', () => {
        it("should return 400 if a genre name is less than 5",async()=>{
           let res = await request(server).post('/api/genres/').send({name:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"})
           expect(res.status).toBe(400)
        })
    });
    describe('/POST', () => {
        it("should save the genre if it is valid",async()=>{
            await request(server).post("/api/genres").send({name:"romantic"});

            let genre = await Genre.findOne({name:"romantic"})

            let payload= {_id:new mongoose.Types.ObjectId(),name:"romantic"}

            expect(genre).toMatchObject(payload)
        })
    });

    describe('/PUT :id', () => {
        it("should return a genre if a valid id passed",async()=>{
           let res = await request(server).post("/api/genres").send({name:"romantic"});

           let genre = await request(server).put("/api/genres/"+res.body._id).send({name:"updategenre"});

           expect(genre.body).toMatchObject({name:"updategenre"})

        })
    });
    describe("/DELETE :id",()=>{
        it("should delete genre success if a valid id pass and isAdmin",async()=>{
            let payload = {_id:new mongoose.Types.ObjectId(),isAdmin:true};
            
            let token =new User(payload).generateToken();

            let genre= new Genre({
                name:"romatic"
            })
            genre= await genre.save();

            let res = await request(server).delete('/api/genres/'+genre._id).set("x-auth-token",token);
            expect(res.status).toBe(200);
        })
    })    
    
})
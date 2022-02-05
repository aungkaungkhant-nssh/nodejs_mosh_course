const mongoose = require('mongoose');
const { Rental } = require('../../../models/rental');
const { User } = require('../../../models/user');
const request = require('supertest')
const moment = require('moment');
const { Movie } = require('../../../models/movie');
describe('/api/returns', () => {
    let rental;
    let movieId;
    let userId;
    let token;
    let movie;
    beforeEach(async() => {
        server=require('../../../index')
        movieId = mongoose.Types.ObjectId();
        userId = mongoose.Types.ObjectId();

        token = new User().generateToken();

        movie = new Movie({
            _id:movieId,
            name:"actOfValor",
            dailyRentalRate:2,
            genre:{name:"action"},
            numberInstock:10
        })
        await movie.save();

        rental = new Rental({
            user:{
                _id:userId,
                name:"aungkaungkhant",
                email:"akkgit0909@gmail.com"
            },
            movie:{
                _id:movieId,
                name:"actOfValor",
                dailyRentalRate:2
            }
        })
        rental = await rental.save()

        
    })
    let exec = ()=>{
        return request(server).post('/api/returns').set("x-auth-token",token).send({userId,movieId})
    }
    afterEach(async() =>{
        await server.close()
        await Rental.remove({})
        await Movie.remove({})
    })
    it("should work",async()=>{
        let res =await Rental.findById(rental._id);
        expect(res).not.toBeNull();
    })
    it("should return 400 if a movie id is not provided",async()=>{
      movieId="";
      let res = await exec();
      expect(res.status).toBe(400);
    })
    it("should return 400 if a user id is not provided",async()=>{
        userId="";
        let res = await exec();
        expect(res.status).toBe(400);
    })
    it("should return 404 if no rental found for movie/customer id",async()=>{
         await Rental.remove({});
         let res = await exec();
         expect(res.status).toBe(404)
    })
    it("should return date process",async()=>{
        await exec();
        let res = await Rental.findById(rental._id);
        let diff = new Date() - res.dateReturned;
        expect(diff).toBeLessThan(10*1000);
    })
    it("should caculate rental fee",async()=>{
        rental.dateOut=moment().add(-7,"days");
        await rental.save()
        await exec();

        let res = await Rental.findById(rental._id);

        expect(res.rentalFee).toBe(14)
    })
    it("should movie numberInstock",async()=>{
        await exec();
       let res= await Movie.findById(movieId);
       expect(res.numberInstock).toBe(9);
    })
});

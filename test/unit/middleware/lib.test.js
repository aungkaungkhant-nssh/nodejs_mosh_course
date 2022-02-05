const {absolute,greeting, currency, products, registerUser, applyDiscount, sendEmail} = require('../../../lib')

const db = require("../../../data");
const email =require('../../../email')
describe('absolute', () => {
    it("should return positive number when an input is positive",()=>{
        let  number = absolute(1);
        expect(number).toBe(1);
    })
    it("should return positive number when an input in negative",()=>{
        let number = absolute(-1);
        expect(number).toBe(1);
    })
});

describe('greeting', () => {
    it("should return greeting message",()=>{
        let result = greeting("akk");
        expect(result).toContain("Hello")
        expect(result).toMatch(/akk/)
    })
});

describe('currency', () => {
    it("should return a supported currency",()=>{
        let result = currency();
        expect(result).toBeDefined();
        expect(result).not.toBeNull();
        expect(result).toEqual(expect.arrayContaining(["AUD","SGD","KYAT"]))
    })
});


describe('products', () => {
    it("should return product when a given input id",()=>{
        let result = products(1);
        expect(result).toStrictEqual({id:1,name:"chees"})
        expect(result).toMatchObject({id:1,name:"chees"})
    })
});

describe('registerUser', () => {
    it("should return falsy when a user is undefined",()=>{
        expect(()=>{ registerUser(null)}).toThrow();
    })
    it("should return truthy when a user is defined",()=>{
        let result = registerUser("akk");
        expect(result).toMatchObject({username:"akk"})
    })
});

describe('applyDiscount', () => {
    it("should discount when a user point is greater than 10",()=>{
            db.getCustomerSync=function(customerId){
                return {customerId,point:11}
            }
            let discount=applyDiscount(1);
            expect(discount).toBe(9)
    })
});

describe('sendEmail', () => {
    it("should customer id and send the email",()=>{
        db.getCustomerSync=jest.fn().mockReturnValue({email:"akkgit0909@gmail.com"});

        email.send=jest.fn();
        sendEmail(1);
        expect(email.send).toHaveBeenCalled()
        expect(email.send.mock.calls[0][0]).toBe("akkgit0909@gmail.com")
        expect(email.send.mock.calls[0][1]).toBe("Hello world")
    })
});



const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("basic sample test", () => {
    it('1 + 1 = 2', () => {
        expect(1+1).toBe(2);
    });
});

describe("Authentication Tests", () => {
    describe("POST Signin", () => {
        it("should return success message and token", async () => {
            const username = "ygrover";
            const password = "password";
            const response = await request(app)
                .post("/api/signin")
                .send({username: username, password: password});
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("User signed in successfully");
            expect(response.body).toHaveProperty("token");
        })
    })
    describe("POST Signup", () => {
        it("should return success message", async () => {
            const username = "randomusername"; // this will need to be changed after being run once, since username exists
            const password = "password";
            const response = await request(app)
                .post("/api/signup")
                .send({username: username, password: password});
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("New user successfully created!")
        })
    })
})

afterAll(done => {
    mongoose.connection.close();
    done();
})
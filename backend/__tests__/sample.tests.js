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
            const username = "randomusername"; 
            const password = "password";
            try {
                await request(app)
                .delete("/api/deleteAccount")
                .send({username: username, password: password});
            } catch (err) {
                console.log('account not found');
                console.error(err);
            }
            const response = await request(app)
                .post("/api/signup")
                .send({username: username, password: password});
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("New user successfully created!")
        })
    })
    describe("POST Delete Account", () => {
        it("should return success message and deleted count", async () => {
            const username = "test_user";
            const password = "password";
            try {
                await request(app)
                .post("/api/signup")
                .send({username: username, password: password});
            } catch (err) {
                console.log('account already exists');
                console.error(err);
            }
            const response = await request(app)
                .delete("/api/deleteAccount")
                .send({username: username, password: password});
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe("User " + username + " deleted successfully");
            expect(response.body).toHaveProperty("data");
            expect(response.body.data).toHaveProperty("deletedCount");
            expect(response.body.data.deletedCount).toBeGreaterThan(0);

        })
    })
})

afterAll(done => {
    mongoose.connection.close();
    done();
})
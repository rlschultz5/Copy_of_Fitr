const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const randomTitle = require("random-title");

const dbConfig = require("../config/db.config")

const db = require("../models");
const User = db.user;
const Workout = db.workout;
const Activity = db.activity;

beforeAll(async () => {
    try {
        await mongoose.connect(dbConfig.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (err) {
        console.log("Error occurred when connecting to database");
    }
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe("Activity Tests", () => {
    describe("GET Get activity", () => {
        it("should return selected activity from database", async () => {
            const count = await Activity.count();
            const activity = await Activity.findOne().skip(Math.floor(Math.random() * count));
            const response = await request(app)
                .get("/api/activity/get")
                .query({id: activity._id.toString()});
            console.log(response.body)
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("data");
        })
    })

    describe("POST Add activity", () => {
        it("should return activity added", async () => {
            const activity = {
                name: randomTitle({min: 1, max: 1}),
                userCount: 0
            }
            const response = await request(app)
                .post("/api/activity/add")
                .send(activity)
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
        })
    })

    describe("DELETE Remove activity", () => {
        it("should delete activity from database", async () => {
            const count = await Activity.count();
            const activity = await Activity.findOne().skip(Math.floor(Math.random() * count));
            const response = await request(app)
                .delete("/api/activity/delete")
                .send({id: activity._id})
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("data");
        })
    })

    describe("POST Update user count", () => {
        it("should update user count of given activity", async () => {
            const count = await Activity.count();
            const activity = await Activity.findOne().skip(Math.floor(Math.random() * count));
            const response = await request(app)
                .post("/api/activity/updateUserCount")
                .send({id: activity._id, userCount: activity.userCount + 5})
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
        })
    })
})
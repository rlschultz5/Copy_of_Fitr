const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const randomTitle = require("random-title");
const randomDate = require("random-date-generator");

const db = require("../models");
const User = db.user; 

const activities = [
    "Basketball",
    "Lifting",
    "Tennis",
    "Running",
    "Yoga",
    "Swimming",
    "Flag Football",
    "Soccer"
]

const locations = [
    "The Nick",
    "The Shell",
    "Nielsen Tennis Center"
]

const experienceLevels = [
    "Casual",
    "Intermediate",
    "Competitive"
];

const lengths = [30, 60, 90, 120, 150, 180];

describe("Workout Tests", () => {
    describe("POST Create Workout", () => {
        it("should return success message", async () => {
            const user = await User.findOne();
            console.log(user)
            let workoutData = {
                title: randomTitle({min: 3, max: 9}),
                activity: activities[Math.floor(Math.random() * activities.length)],
                location: locations[Math.floor(Math.random() * locations.length)],
                minPeople: Math.floor(Math.random() * 10),
                date: randomDate.getRandomDateInRange(new Date(2021, 9, 1), new Date(2021, 11, 31)),
                experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
                length: lengths[Math.floor(Math.random() * lengths.length)],
                memberCount: 1,
                creator_id: user._id,
                membersAttending: [user._id],
                description: "This is the workout description"
            }
            workoutData.maxPeople = workoutData.minPeople + Math.floor(Math.random() * 10);
            workoutData.isFull = workoutData.memberCount === workoutData.maxPeople;
            console.log(workoutData);
            const response = await request(app)
                .post("/api/workout/create")
                .send(workoutData);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe("Workout successfully created");
        })
    })
})

afterAll(done => {
    mongoose.connection.close();
    done();
})
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const randomTitle = require("random-title");
const randomDate = require("random-date-generator");

const dbConfig = require("../config/db.config")

const db = require("../models");
const User = db.user;
const Workout = db.workout;

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

describe("Workout Tests", () => {
    describe("POST Create New Workout", () => {
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
    
    describe("GET Get Existing Workout", () => {
        it("should return success message and workout details", async () => {
            try {
                const workout = await Workout.findOne();
                const response = await request(app)
                    .get("/api/workout/get")
                    .query({id: workout._id});
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("data");
                expect(response.body.data).toHaveProperty("_id");
            } catch (err) {
                console.log(err);
                console.log("error occurred");
            }
        })
    })

    describe("POST Edit existing workout", () => {
        it("should return correct updated workout details", async () => {
            try {
                const count = await Workout.count();
                const workout = await Workout.findOne().skip(Math.floor(Math.random() * count));
                const update = {location: (workout.location === "The Nick") ? "The Shell" : "The Nick"}
                const data = {
                    id: workout._id,
                    update: update
                }
                const response = await request(app)
                    .post("/api/workout/edit")
                    .send(data);
                console.log(response.body);
                expect(response.statusCode).toBe(200);
            } catch (err) {
                console.log(err);
                console.log("error occurred");
            }
        })
    })

    describe("POST Get workout(s) matching fields", () => {
        it("should return message saying no match, or details of matching workouts", async () => {
            try {
                const fields = {
                    minPeople: Math.floor(Math.random() * 10)
                }
                const response = await request(app)
                    .post("/api/workout/getWorkouts")
                    .send({fields: fields})
                expect([200, 500]).toContain(response.statusCode);
                if (response.statusCode === 200) {
                    expect(response.body).toHaveProperty("data");
                    expect(response.body.data.length).toBeGreaterThan(0);
                }
                else if (response.statusCode === 500) {
                    expect(response.body).toHaveProperty("error");
                }
            } catch (err) {
                console.log(err);
            }
        })
    })

    describe("GET Get activity of given workout", () => {
        it("should send activity of provided workout", async () => {
            try {
                const count = await Workout.count();
                const workout = await Workout.findOne().skip(Math.floor(Math.random() * count));
                const response = await request(app)
                    .get("/api/workout/getActivity")
                    .query({id: workout._id})
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("data");
                expect(response.body.data).toHaveProperty("activity");
                expect(activities).toContain(response.body.data.activity);
            } catch (err) {
                console.log(err);
            }
        })
    })

    describe("GET Check if given workout is full", () => {
        it("should return if given workout is full or not", async () => {
            try {
                const count = await Workout.count();
                const workout = await Workout.findOne().skip(Math.floor(Math.random() * count));
                const response = await request(app)
                    .get("/api/workout/isFull")
                    .query({id: workout._id})
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("isFull");
            } catch (err) {
                console.log(err);
            }
        })
    })

    describe ("GET Workout attending members", () => {
        it("should return array of workout members", async () => {
            try {
                const count = await Workout.count();
                const workout = await Workout.findOne().skip(Math.floor(Math.random() * count));
                const response = await request(app)
                    .get("/api/workout/getAttendees")
                    .query({id: workout._id})
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("data");
                expect(response.body.data.length).toBeGreaterThan(0);
            } catch (err) {
                console.log(err);
            }
        })
    })

    describe ("DELETE delete existing workout", () => {
        it("should return message saying workout deleted", async () => {
            try {
                const count = await Workout.count();
                const workout = await Workout.findOne().skip(Math.floor(Math.random() * count));
                const response = await request(app)
                    .delete("/api/workout/delete")
                    .send({id: workout._id})
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("data");
            } catch (err) {
                console.log(err);
            }
        })
    })
})


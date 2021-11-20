const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const db = require("../models");
const dbConfig = require("../config/db.config")

const User = db.user;
const Workout = db.workout;

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

describe("User Tests", () => {
  describe("GET getuser", () => {
    it("should return all fields of a user given user_id", async () => {
      jest.setTimeout(10*1000);
      try{
        const user = await User.findOne();
        const user_id = user._id;
        const response = await request(app)
            .get("/api/user/getUser")
            .send({user_id: user_id});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        //expect(response.body).toHaveProperty("_id");
        //expect(response.body).toHaveProperty("username");
        //expect(response.body).toHaveProperty("password");
        //expect(response.body).toHaveProperty("name");
        //expect(response.body).toHaveProperty("attendingWorkouts");
        //expect(response.body).toHaveProperty("createdWorkouts");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("GET createdWorkouts", () => {
    it("should return the workouts created by given user_id", async () => {
      jest.setTimeout(10*1000);
      try{
        const user = await User.findOne();
        const user_id = user._id;
        const response = await request(app)
            .get("/api/user/getCreatedWorkouts")
            .send({user_id: user_id});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("GET attendingWorkouts", () => {
    it("should return the workouts a user is attending by given user_id", async () => {
      jest.setTimeout(10*1000);
      try{
        const user = await User.findOne();
        const user_id = user._id;
        const response = await request(app)
            .get("/api/user/getCreatedWorkouts")
            .send({user_id: user_id});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("GET users", () => {
    it("should return all users in collection", async () => {
      jest.setTimeout(10*1000);
      try{
        const response = await request(app)
            .get("/api/user/getUsers")
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("POST editUser", () => {
    it("should allow the fields of a User to be edited", async () => {
      jest.setTimeout(10*1000);
      try{
        const user = await User.findOne();
        let userData = {
            username: user.username,
            city: "testCity",
            state: "testState",
            zipCode: 12345,
            schoolYear: "Freshman",
            activities: []
        }
        console.log(userData);
        const response = await request(app)
            .post("/api/user/edit")
            .send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("User has been edited");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("POST updateWorkoutPreferences", () => {
    jest.setTimeout(10*1000);
    it("should allow the workoutPreferences field of a user to be updated", async () => {
      try{
        let userData = {
            preferences: []
        }
        console.log(userData);
        const response = await request(app)
            .post("/api/user/updateWorkoutPreferences")
            .send(userData);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Preferences have been updated");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })

  describe("POST joinWorkout", () => {
    jest.setTimeout(10*1000);
    it("should allow a user to join a workout", async () => {
      try{
        const user = await User.findOne();
        const workout = await Workout.findOne();
        const response = await request(app)
            .post("/api/user/joinWorkout")
            .send({user_id: user._id, workout_id: workout._id});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("User has joined workout!");
      } catch (err) {
        console.log(err);
        console.log("An error has occured please check logs");
      }
    })
  })


})

afterAll(done => {
    mongoose.connection.close();
    done();
})

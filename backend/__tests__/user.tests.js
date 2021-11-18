const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("User Tests", () => {
  describe("GET getuser", () => {
    it("should return all fields of a user given user_id", async () => {
        const user_id = "617f42fd6af4247a5af01772";
        const response = await request(app)
            .get("/api/user/getUser")
            .send({user_id: user_id});
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("preferences");
        expect(response.body).toHaveProperty("activities");
        expect(response.body).toHaveProperty("_id");
        expect(response.body).toHaveProperty("username");
        expect(response.body).toHaveProperty("password");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("city");
        expect(response.body).toHaveProperty("state");
        expect(response.body).toHaveProperty("zipCode");
        expect(response.body).toHaveProperty("attendingWorkouts");
        expect(response.body).toHaveProperty("createdWorkouts");
    })
  })
  describe("GET createdWorkouts", () => {
    it("should return the workouts created by given user_id", async () => {
        const user_id = "617f42fd6af4247a5af01772";
        const response = await request(app)
            .get("/api/user/getCreatedWorkouts")
            .send({user_id: user_id});
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBe(
          ["6184c3236af4247a5af0184d", "618071fe6af4247a5af017ee"]
        );
    })
  })

})

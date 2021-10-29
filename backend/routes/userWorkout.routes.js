const userWorkoutController = require("../controllers/userWorkout.controller");

module.exports = (app) => {
    app.get("/api/userworkout/get", userWorkoutController.getUserWorkouts);
    app.post("/api/userworkout/add", userWorkoutController.addUserWorkout);
    app.delete("/api/userworkout/remove", userWorkoutController.removeUserWorkout);
    app.get("/api/userworkout/getParticipants", userWorkoutController.getParticipants);
}
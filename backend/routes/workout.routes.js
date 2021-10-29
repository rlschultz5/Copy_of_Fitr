const workoutController = require("../controllers/workout.controller");

module.exports = (app) => {
    app.get("/api/workout/get", workoutController.getWorkout);
    app.post("/api/workout/edit", workoutController.editWorkout);
    app.delete("/api/workout/delete", workoutController.deleteWorkout);
    app.post("/api/workout/create", workoutController.createWorkout);
    app.get("/api/workout/getActivity", workoutController.getActivity);
    app.get("/api/workout/getParticipants", workoutController.getParticipants);
    app.get("/api/workout/getWorkouts", workoutController.getWorkouts);
    app.get("/api/workout/isFull", workoutController.isFull);
}
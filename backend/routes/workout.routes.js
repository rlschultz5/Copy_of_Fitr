const workoutController = require("../controllers/workout.controller");

module.exports = (app) => {
    app.get("/api/workout/get", workoutController.getWorkout);
    app.post("/api/workout/edit", workoutController.editWorkout);
    app.delete("/api/workout/delete", workoutController.deleteWorkout);
    app.post("/api/workout/create", workoutController.createWorkout);
    app.get("/api/workout/getActivity", workoutController.getActivity);
    app.post("/api/workout/getWorkouts", workoutController.getWorkouts);
    app.get("/api/workout/isFull", workoutController.isFull);
    app.get("/api/workout/getAttendees", workoutController.getAttendees);
}

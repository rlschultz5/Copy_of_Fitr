const userController = require("../controllers/user.controller");

module.exports = (app) => {
    app.post("/api/user/edit", userController.editUser);
    app.get("/api/user/getUser", userController.getUser);
    app.get("/api/user/getUsers", userController.getUsers);
    app.post("/api/user/updateWorkoutPreferences", userController.updateWorkoutPref);
    app.get("/api/user/getWorkouts", userController.getWorkouts);
    app.post("/api/user/getCreatedWorkouts", userController.getCreatedWorkouts);
    app.post("/api/user/getAttendingWorkouts", userController.getAttendingWorkouts);
    app.post("/api/user/joinWorkout", userController.joinWorkout);
}

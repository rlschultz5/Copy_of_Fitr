const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");

module.exports = (app) => {
    app.post("/api/signup", authController.signUp);
    app.post("/api/signin", authController.signIn);
    app.get("/api/forgotPassword", authController.getPassword);
    app.delete("api/user/delete", authController.deleteAccount);

    app.post("/api/user/edit", userController.editUser);
    app.get("/api/user/getUser", userController.getUser);
    app.get("api/user/getUsers", userController.getUsers);
    app.post("api/user/updateWorkoutPreferences", userController.updateWorkoutPref);
    app.get("api/user/getWorkouts", userController.getWorkouts);
    app.get("api/user/getCreatedWorkouts", userController.getCreatedWorkouts);
    
}
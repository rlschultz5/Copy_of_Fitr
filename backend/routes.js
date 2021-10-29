const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin.controller");

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

    app.post("/api/admin/add", adminController.addAdmin);
    app.get("/api/admin/get", adminController.getAdmin);
    app.delete("/api/admin/remove", adminController.removeAdmin);
    app.post("/api/admin/updateEmail", adminController.updateEmail);
    
}
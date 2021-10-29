const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const adminController = require("./controllers/admin.controller");
const activityController = require("./controllers/activity.controller");

module.exports = (app) => {
    // auth routes
    app.post("/api/signup", authController.signUp);
    app.post("/api/signin", authController.signIn);
    app.get("/api/forgotPassword", authController.getPassword);
    app.delete("api/user/delete", authController.deleteAccount);

    // user routes
    app.post("/api/user/edit", userController.editUser);
    app.get("/api/user/getUser", userController.getUser);
    app.get("api/user/getUsers", userController.getUsers);
    app.post("api/user/updateWorkoutPreferences", userController.updateWorkoutPref);
    app.get("api/user/getWorkouts", userController.getWorkouts);
    app.get("api/user/getCreatedWorkouts", userController.getCreatedWorkouts);

    // admin routes
    app.post("/api/admin/add", adminController.addAdmin);
    app.get("/api/admin/get", adminController.getAdmin);
    app.delete("/api/admin/remove", adminController.removeAdmin);
    app.post("/api/admin/updateEmail", adminController.updateEmail);

    // activity routes
    app.get("/api/activity/get", activityController.getActivity);
    app.post("/api/activity/add", activityController.addActivity);
    app.delete("/api/activity/delete", activityController.deleteActivity);
    app.post("/apo/activity/updateUserCount", activityController.updateUserCount);
    
}
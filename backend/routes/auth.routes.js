const authController = require("../controllers/auth.controller");
const forgotPassController = require("../controllers/forgotPassword.controller");

module.exports = (app) => {
    app.post("/api/signup", authController.signUp);
    app.post("/api/signin", authController.signIn);
    app.post("/api/forgotPassword", forgotPassController.forgotPassword);
    app.post("/api/resetPassword/:userId/:token", forgotPassController.resetPassword);
    app.delete("/api/deleteAccount", authController.deleteAccount);
}
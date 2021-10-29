const authController = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/api/signup", authController.signUp);
    app.post("/api/signin", authController.signIn);
    app.get("/api/forgotPassword", authController.forgotPassword);
    app.delete("/api/deleteAccount", authController.deleteAccount);
}
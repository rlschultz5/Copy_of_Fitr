const authController = require("./controllers/auth.controller");

module.exports = (app) => {
    app.post("/api/signup", authController.signUp);
    app.post("/api/signin", authController.signIn);
    app.get("/api/forgotPassword", authController.getPassword);
    app.delete("api/user/delete", authController.deleteAccount);
}
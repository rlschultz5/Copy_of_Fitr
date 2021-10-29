const adminController = require("../controllers/admin.controller");

module.exports = (app) => {
    app.post("/api/admin/add", adminController.addAdmin);
    app.get("/api/admin/get", adminController.getAdmin);
    app.delete("/api/admin/remove", adminController.removeAdmin);
    app.post("/api/admin/updateEmail", adminController.updateEmail);
}
const activityController = require("./controllers/activity.controller");

module.exports = (app) => {
    app.get("/api/activity/get", activityController.getActivity);
    app.post("/api/activity/add", activityController.addActivity);
    app.delete("/api/activity/delete", activityController.deleteActivity);
    app.post("/apo/activity/updateUserCount", activityController.updateUserCount);
}
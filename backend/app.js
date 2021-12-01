const express = require('express');
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize());
require("./passport/strategies")(passport);

require("./routes/secure.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/user.routes")(app);
require("./routes/userWorkout.routes")(app);
require("./routes/workout.routes")(app);


app.get("/", (req, res) => {
    res.json({message: "Welcome to Fitr :)"});
})

module.exports = app;

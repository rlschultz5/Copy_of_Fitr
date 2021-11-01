const express = require('express');
const passport = require('passport')
const dbConfig = require("./config/db.config")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize());
require("./config/strategies.config")(passport);

const db = require("./models")

let WorkoutLength = db.workoutLength;
let Experience = db.experience;
let Exercise = db.exercise;


db.mongoose.connect(dbConfig.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to db.");
    dbInitialize();
  })
  .catch((err) => {
    console.error("Error when connecting to db", err);
    process.exit();
  });

dbInitialize = async () => {
  WorkoutLength.estimatedDocumentCount( async (err, count) => {
  if (!err && count === 0) {
    try {
      let workoutlength = await new WorkoutLength({
        length: 30
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    try {
      let workoutlength = await new WorkoutLength({
        length: 60
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    try {
      let workoutlength = await new WorkoutLength({
        length: 90
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    try {
      let workoutlength = await new WorkoutLength({
        length: 120
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    try {
      let workoutlength = await new WorkoutLength({
        length: 150
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    try {
      let workoutlength = await new WorkoutLength({
        length: 180
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

  }
})

  Experience.estimatedDocumentCount( async (err, count) => {
    if (!err && count === 0) {
      try {
        let experience = await new Experience({
          level: "casual"
        })
        await experience.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let experience = await new Experience({
          level: "intermediate"
        })
        await experience.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let experience = await new Experience({
          level: "competitive"
        })
        await experience.save();
      }
      catch (err) {
          console.log("error", err);
      }
    }
  });

  Exercise.estimatedDocumentCount( async (err, count) => {
    if (!err && count === 0) {
      try {
        let exercise = await new Exercise({
          name: "weightlifting"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "yoga"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "pilates"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "cycling"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "walking"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "jogging"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "flag football"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "soccer"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "basketball"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "golf"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "ultimate frisbee"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "disc golf"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "volleyball"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "spike ball"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "boxing"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "kickboxing"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "kayaking"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "canoeing"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "swimming"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "fishing"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "hockey"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "gaming-shooter"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "gaming-lifestyle"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }

      try {
        let exercise = await new Exercise({
          name: "gaming-sports"
        })
        await exercise.save();
      }
      catch (err) {
          console.log("error", err);
      }
      
    }
  })

}

require("./routes/auth.routes")(app);
require("./routes/admin.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/user.routes")(app);
require("./routes/userWorkout.routes")(app);
require("./routes/workout.routes")(app);


app.get("/", (req, res) => {
    res.json({message: "Please give us an A :)"});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})

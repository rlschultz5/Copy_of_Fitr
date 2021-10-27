const express = require('express')
const dbConfig = require("./config/db.config")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const db = require("./models")
let WorkoutLength = db.workoutLength;



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
}


app.get("/", (req, res) => {
    res.json({message: "Please give us an A :)"});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})

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
  //WorkoutLength.estimatedDocumentCount((err, count) => {
  //if (!err && count === 0) {
    try {
      let workoutlength = await new WorkoutLength({
        length: 30
      })
      await workoutlength.save();
    }
    catch (err) {
        console.log("error", err);
    }

    new WorkoutLength({
      length: 60
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added '60' to workoutlength collection");
    });

    new WorkoutLength({
      length: 90
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added '90' to workoutlength collection");
    });

    new WorkoutLength({
      length: 120
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added '120' to workoutlength collection");
    });

    new WorkoutLength({
      length: 150
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added '150' to workoutlength collection");
    });

    new WorkoutLength({
      length: 180
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added '180' to workoutlength collection");
    });
  //}
//});
}


app.get("/", (req, res) => {
    res.json({message: "Please give us an A :)"});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})

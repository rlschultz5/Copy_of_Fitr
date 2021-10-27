const express = require('express')
const dbConfig = require("./config/db.config")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const db = require("./models")



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

dbInitialize = () => {

}


app.get("/", (req, res) => {
    res.json({message: "Please give us an A :)"});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})

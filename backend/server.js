const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({message: "Please give us an A :)"});
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})
const {uniqueNamesGenerator, names} = require('unique-names-generator');
const usernameGenerator = require('random-username-generator');
const emailGen = require('random-email');
const bcrypt = require('bcrypt');

const dbConfig = require("../../config/db.config");
const db = require("../../models");
const User = db.user;

const schoolYear = [
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
    "Graduate Student",
    "Staff/Employee"
];

const activities = [
    "Basketball",
    "Lifting",
    "Tennis",
    "Running",
    "Yoga",
    "Swimming",
    "Flag Football",
    "Soccer"
]

const experience = [
    "casual",
    "intermediate",
    "competitive"
]

const createUser = async () => {
    try {
        let userObj = {
            username: usernameGenerator.generate(),
            password: await bcrypt.hash("password", 10),
            name: uniqueNamesGenerator({dictionaries: [names]}),
            email: emailGen({domain: 'exampledomain.com'}),
            schoolYear: schoolYear[Math.floor(Math.random() * schoolYear.length)],
            activities: activities.sort(() => Math.random() - Math.random()).slice(0, Math.floor(Math.random() * (activities.length - 1))),
            isAdmin: false,
            createdWorkouts: [],
            attendingWorkouts: []
        };
        let activityExperience = userObj.activities.map(activity => (
            {
                name: activity,
                experience: experience[Math.floor(Math.random() * experience.length)]
            }
        ));
        userObj.activityExperience = activityExperience;
        return userObj;
    } catch (err) {
        console.log(err, err.message);
    }
}

const addUser = async (user) => {
    try {
        const res = await new User(user).save();
        if (!res) console.log("error occurred while saving");
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

const run = async () => {
    for (let i = 0; i < 50; i++) { // loop condition can be edited to add as many elements as desired
        const user = await createUser();
        await addUser(user);
    }
    console.log("All users added")
    try {
        db.mongoose.connection.close();
    } catch (err) {
        console.log(err);
        console.log("error when closing connection")
    }
}

db.mongoose.connect(dbConfig.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log("Successfully connected to db.");
    run();
  })
  .catch(() => {
    console.error("Error when connecting to db", err);
    process.exit();
  })
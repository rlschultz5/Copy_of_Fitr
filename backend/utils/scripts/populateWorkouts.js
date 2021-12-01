const randomTitle = require("random-title");
const randomDate = require("random-date-generator");

const dbConfig = require("../../config/db.config");
const db = require("../../models");
const Workout = db.workout;
const User = db.user;

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

const locations = [
    "The Nick",
    "The Shell",
    "Nielsen Tennis Center"
]

const experienceLevels = [
    "Casual",
    "Intermediate",
    "Competitive"
];

const lengths = [30, 60, 90, 120, 150, 180];

const createWorkoutObj = async () => {
    const user = await User.findOne({username: "Smart-director-94"});
    let workoutData = {
        title: randomTitle({min: 3, max: 9}),
        activity: activities[Math.floor(Math.random() * activities.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        minPeople: Math.floor(Math.random() * 10),
        date: randomDate.getRandomDateInRange(new Date(2021, 9, 1), new Date(2021, 11, 31)),
        experienceLevel: experienceLevels[Math.floor(Math.random() * experienceLevels.length)],
        length: lengths[Math.floor(Math.random() * lengths.length)],
        memberCount: 1,
        creator_id: user._id,
        membersAttending: [user._id],
        description: "This is the workout description"
    }
    workoutData.maxPeople = workoutData.minPeople + Math.floor(Math.random() * 10);
    workoutData.isFull = workoutData.memberCount === workoutData.maxPeople;
    return workoutData;
}

const addWorkout = async (workoutData) => {
    try {
        const res = await new Workout(workoutData).save();
        const user = await User.findOne({username: "Smart-director-94"});
        updatedCreatedWorkouts = [...user.createdWorkouts, res];
        user.createdWorkouts = updatedCreatedWorkouts;
        await user.save();
    } catch (err) {
        console.log(err)
    }
}

const run = async () => {
    for (let i = 0; i < 1; i++) { // loop condition can be edited to add as many elements as desired
        const workout = await createWorkoutObj();
        //console.log(workout);
        await addWorkout(workout);
    }
    console.log("All workouts added")
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
      run()
  })
  .catch(() => {
    console.error("Error when connecting to db", err);
    process.exit();
  })
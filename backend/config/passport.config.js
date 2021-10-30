const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("../models")
const User = db.user;

module.exports = (app) => {
    passport.use("signin", new LocalStrategy(
        async (username, password, done) => {
            try {
                let user = await User.findOne({username: username});
                if (!user) {
                    return done(null, false, {message: "Username not found"});
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: "Incorrect password provided"});
                }
                return done(null, user);
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }
    ))
    
    passport.use("signup", new LocalStrategy(
        async (username, password, done) => {
            try {
                let user = await User.findOne({username: username});
                if (user) {
                    return done(null, false, {message: "Account exists with provided username"});
                }
                User.create({
                    username: username,
                    password: password,
                    name: req.body.name,
                    email: req.body.email,
                    city: req.body.city,
                    state: req.body.state,
                    zipCode: req.body.zipCode,
                    schoolYear: req.body.schoolYear,
                    activities: req.body.activies,
                    preferences: { // depends on format that front end sends request data
                        activitiesExperience: req.body.activitiesExperience 
                    },
                    isAdmin: req.body.isAdmin
                })
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }
    ))
}



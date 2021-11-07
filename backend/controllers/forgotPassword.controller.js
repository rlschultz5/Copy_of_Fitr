const crypto = require("crypto");
const bcrypt = require('bcrypt');
const passwordGenerator = require("generate-password");
const sendEmail = require("../utils/sendEmail");

const emailConfig = require("../config/email.config")
const db = require("../models");
const Token = require("../models/token.model");
const User = db.user;

exports.forgotPassword = async (req, res) => {
    try {
        if (!req.body.username) {
            res.status(401).send({error: "No username provided"});
        }
        const doc = await User.findOne({username: req.body.username});
        if (!doc) {
            res.status(401).send({error: "Username not found"});
        } else {
            let token = await Token.findOne({ userId: doc._id });
            if (!token) {
                token = await new Token({
                    userId: doc._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
            }

            const tempPassword = passwordGenerator.generate({
                length: 20,
                numbers: true
            })
            doc.password = await bcrypt.hash(tempPassword, 10);
            await doc.save();
            console.log(tempPassword)
            const message = "Here is your temporary password: " + tempPassword;
            const email = doc.email;
            if (!email) {
                res.status(500).send({error: "No email found for user"})
            } else {
                await sendEmail(doc.email, "Password reset", message);
                res.send({message: "new temporary password sent to provided email"});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({error: err.message})
    }
}

exports.resetPassword = async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(401).send({error: "No password provided"});
        }
        const doc = await User.findById(req.params.userId);
        if (!doc) {
            return res.status(401).send({error: "invalid/expired link"});
        }
        const token = await Token.findOne({
            userId: doc._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(401).send({error: "invalid/expired link"});
        }
        const password = req.body.password;
        const newHashedPassword = await bcrypt.hash(password, 10);
        doc.password = newHashedPassword;
        await doc.save();
        await token.delete();

        res.send({message: "password successfully reset"});
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "An error occurred"});
    }

}

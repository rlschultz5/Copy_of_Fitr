const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config");

const sendEmail = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: emailConfig.service,
            port: emailConfig.port,
            auth: {
                user: emailConfig.email,
                pass: emailConfig.password
            }
        });

        await transporter.sendMail({
            from: emailConfig.user,
            to: email,
            subject: subject,
            text: text
        });
        console.log("email sent successfully");
    } catch (err) {
        console.log(err);
        console.log("error when sending email");
    }
}

module.exports = sendEmail;
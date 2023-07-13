const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let details = {
  from: process.env.EMAIL_USER,
  to: "mandardeshpande2003@gmail.com",
  subject: "testing nodemailer",
  text: "hi",
};

mailTransporter.sendMail(details, (err) => {
  console.log(err);
});

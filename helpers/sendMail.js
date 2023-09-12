const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASS, EMAIL_USER } = process.env;

async function sendEmail({ to, subject, html }) {
  const email = {
    from: "pashaponomarenkoa1999@gmail.com",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transport
    .sendMail(email)
    .then(() => console.log("Email send seccess"))
    .catch((error) => console.log(error.message));
}

module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async ({ subject, html, text, to }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: to || process.env.TO_EMAIL,
    subject,
    text,
    html
  });

  return info;
};

module.exports = sendEmail;

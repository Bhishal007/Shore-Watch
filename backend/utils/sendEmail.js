const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  // Configure transporter (use a test email service like Gmail for now)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
      pass: process.env.EMAIL_PASS, // e.g., app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = sendEmail;
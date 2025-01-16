import nodemailer from 'nodemailer';

// Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jusvanth175@gmail.com', // Replace with your email
    pass: 'eaap exin uafa pwdh',       // Replace with your Gmail app password
  },
});

// Email content
export const sendEmail = (name, email) => {
  const mailOptions = {
    from: 'jusvanth175@gmail.com', // Replace with your email
    to: email,                        // Recipient's email address
    subject: 'Congratulations! Your referrals are skyrocketing!',
    text: `Hi ${name},\n\nYou have now reached 98 referrals! You're so close to the top.\n\nKeep up the amazing work!\n\nBest Regards,\nTeam`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

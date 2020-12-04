const nodemailer = require('nodemailer')
const mailgen = require('mailgen')


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailGenerator = new mailgen({
    theme: 'salted',
    product: {
      // Appears in header & footer of e-mails
      name: 'Vibez',
      link: 'https://mailgen.js/',
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
    },
  });

  let response = {};

  if (options.type === 'welcome') {
    response = {
      body: {
        name: options.userName,
        intro: "Welcome to Bookhut! We're very excited to have you on board.",
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  }
  if (options.type === 'password-reset') {
    response = {
      body: {
        name: options.userName,
        intro: 'Click the button bellow to reset password, as you requested',
        action: {
          instructions:
            'To get started with the password reset process, please click here:',
          button: {
            color: '#0582CA', // Optional action button color
            text: 'Reset password',
            link: options.resetLink,
          },
        },
        outro: [
          'Or copy paste the link bellow to your browser',
          `${options.resetLink}`,
          "Need help, or have questions? Just reply to this email, we'd love to help.",
        ],
      },
    };
  }
  const mail = mailGenerator.generate(response);

  const mailOption = {
    from: 'Subha Sarkar <hello@email.com>',
    to: options.email,
    subject: options.subject,
    html: mail,
  };

  await transporter.sendMail(mailOption).catch((err) => console.log(err));
};

module.exports = sendEmail;

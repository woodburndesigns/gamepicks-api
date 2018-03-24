// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
const env = require('dotenv');

env.load();

console.log(process.env.SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'geoff@woodburndesigns.com',
  from: 'info@gamepicks.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg);
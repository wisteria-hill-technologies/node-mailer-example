import 'dotenv/config'

import nodemailer from 'nodemailer';

const config = {
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
  tls: {
    ciphers:'SSLv3'
  }
};

console.log('config >>> ', config);

export const transporter = nodemailer.createTransport(config);

export const sendMailPromise = (mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err) {
      if (!err) {
        resolve('Email sent');
      } else {
        reject(err.message);
      }
    });
  });

const mailOptions = {
  from: process.env.EMAIL_SMTP_FROM,
  to: process.env.EMAIL_SMTP_TO,
  subject: 'This is a test email.',
  text: 'Hi, this is a test email. You are good to go if you receive this email.',
  html: `
        <p>Hi, this is a test email. You are good to go if you receive this email.</p>
      `,
};

sendMailPromise(mailOptions).then((res) => {
  console.log('res >>> ', res);
}).catch((err) => {
  console.log('err >>> ', err);
});
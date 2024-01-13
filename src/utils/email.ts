import ejs from 'ejs';
import fs from 'fs';
import config from '../config/config';
import transporter from '../config/email';
import { WebhookBody } from 'src/types/types';

const successEmailTemplate = fs
  .readFileSync('templates/success.ejs')
  .toString('utf-8');

export function sendSuccessEmailNotificationEmail(paymentInfo: WebhookBody) {
  const mailOptions = {
    from: config.email.from,
    to: config.email.to,
    subject: `Payment Received: ${paymentInfo.data.currency}${paymentInfo.data.amount}`,
    html: ejs.render(successEmailTemplate, { paymentInfo: paymentInfo.data })
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Success email notification sent', info);
    }
  });
}

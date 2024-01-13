import type { Request, Response } from 'express';
import { WebhookBody, TransactionResponse } from 'src/types/types';
import Flutterwave from 'flutterwave-node-v3';
import config from '../config/config';
import { Transactions } from '../utils/db';
import { sendSuccessEmailNotificationEmail } from '../utils/email';

const flw = new Flutterwave(
  config.flutterwave.public_key,
  config.flutterwave.secret_key
);

export async function paymentWebhookHandler(req: Request, res: Response) {
  const signature = req.headers['verif-hash'] as string;
  if (!signature || signature !== config.flutterwave.secret_hash) {
    return res.status(401).end();
  }
  const payload: WebhookBody = req.body;
  const response: TransactionResponse = await flw.Transaction.verify({
    id: `${payload.data.id}`
  });
  if (
    !new Transactions().exists(payload.data.id) &&
    response.data &&
    response.data.status === 'successful'
  ) {
    sendSuccessEmailNotificationEmail(payload);
    new Transactions().save(payload.data.id);
  }
  res.status(200).end();
}

import { Router } from 'express';
import { paymentWebhookHandler } from '../controller/webhookCallback';

const router = Router();

router.post('/webhook-callback', paymentWebhookHandler);

export default router;

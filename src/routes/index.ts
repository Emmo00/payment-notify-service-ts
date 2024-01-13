import { Router } from 'express';
import { paymentWebhookHandler } from 'src/controller/webhookCallback';

const router = Router();

router.post('/', paymentWebhookHandler);

export default router;

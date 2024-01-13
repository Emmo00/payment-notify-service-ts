import express, { type Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/config';
import router from './routes';

const app: Express = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.cors.cors_origin }));
app.use(morgan('combined'));

app.use('/api', router);

app.get('/api/status', (req: Request, res: Response) => {
  res.status(200);
  res.json({ status: 'active' });
});

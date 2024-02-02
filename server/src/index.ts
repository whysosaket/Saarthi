import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes';
import cors from 'cors';
import connectDB from './database';

connectDB();

const app: Express = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

app.use('/', router());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
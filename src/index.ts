import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import userRouter from './router/UserRouter';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('', userRouter);

export default app;
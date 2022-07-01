import accountRouter from './routers/accountRouter.js';
import userRouter from './routers/userRouter.js'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(accountRouter);
server.use(userRouter);

server.listen(process.env.PORT);
import { signUpUser, signInUser } from './controllers/userControllers.js';
import { registerMovement } from './controllers/moneyControllers.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());


server.post('/sign-up', signUpUser);
server.post('/sign-in', signInUser);

server.post('/moneyMovement', registerMovement)

server.listen(process.env.PORT);
import { signUpUser } from './controllers/userControllers.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const server = express();
server.use(cors());
server.use(express.json());


server.post('/sign-up', signUpUser);







server.listen(process.env.PORT);
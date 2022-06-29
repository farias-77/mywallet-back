import { MongoClient } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import joi from 'joi';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());


const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
    db = mongoClient.db('mywallet');
});

server.post('/sign-up', async (req, res) => {

    const { name, email, password } = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required() 
    })

    const { error } = signUpSchema.validate({ name, email, password });
    const user = await db.collection('users').findOne({ email });

    //verifica se os campos são válidos ou se o usuário já tem um cadastro
    if(joi.isError(error) || user){
        return res.status(422).send('Cadastro inválido, verifique as informações');
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({ name, email, encryptedPassword });
    res.status(201).send('Usuário criado');
});







server.listen(process.env.PORT);
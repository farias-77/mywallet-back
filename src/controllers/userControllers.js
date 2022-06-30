import { db } from '../mongoConfig.js';
import bcrypt from 'bcrypt';
import joi from 'joi';

export async function signUpUser(req, res){

    const { name, email, password } = req.body;

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required() 
    })

    const { error } = signUpSchema.validate({ name, email, password });
    const user = await db.collection('users').findOne({ email });

    if(joi.isError(error) || user){
        return res.status(422).send('Cadastro inválido, verifique as informações');
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({ name, email, encryptedPassword });
    res.status(201).send('Usuário criado');
}
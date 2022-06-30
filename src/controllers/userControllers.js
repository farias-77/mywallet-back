import { db } from '../mongoConfig.js';
import { v4 as uuid} from 'uuid';
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
    await db.collection('users').insertOne({ name, email, password: encryptedPassword });
    res.status(201).send('Usuário criado');
}

export async function signInUser(req, res){
    const { email, password } = req.body;

    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required() 
    });

    const { error } = signInSchema.validate({ email, password });

    if(joi.isError(error)){
        res.status(400).send('Login inválido, por favor verifique.');
    }

    const user = await db.collection('users').findOne({ email });

    if(user && bcrypt.compareSync(password, user.password)){
        const token = uuid();

        await db.collection('sessions').insertOne({ userId: user._id, token });
        res.status(201).send(token);
    }
    
    res.status(401).send('Usuário ou senha incorretos');
}
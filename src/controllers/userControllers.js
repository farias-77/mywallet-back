import { db } from '../mongo/mongoConfig.js';
import bcrypt from 'bcrypt';

export async function signUpUser(req, res){

    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.collection('users').insertOne({ name, email, password: encryptedPassword });
    res.status(201).send('Usuário criado');
}

export async function signInUser(req, res){

    const token = res.locals.token;
    const user = res.locals.user;

    await db.collection('sessions').insertOne({ userId: user._id, token });
    res.status(200).send({ token, name: user.name });  
}
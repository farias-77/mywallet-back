import { db } from '../mongo/mongoConfig.js';
import joi from 'joi';

export async function signUpFormValidation(req, res, next){

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

    next();
}
import { db } from '../mongo/mongoConfig.js';
import dayjs from 'dayjs';
import joi from 'joi';

export async function registerMovement(req, res){
    
    const movementSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required()
    });

    //valida dados enviados pelo usuário
    const { value, description } = req.body;
    const { error } = movementSchema.validate({ value, description });
    if(joi.isError(error)){
        return res.status(422).send('Informações inválidas, por favor verifique');
    }

    //valida token do usuário
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token){return res.sendStatus(401);}
    
    const session = await db.collection('sessions').findOne({ token });
    if(!session){return res.sendStatus(401);}

    //verifica se o usuário existe
    const user = await db.collection('users').findOne({_id: session.userId });
    if(!user){return res.sendStatus(401);}

    //insere transação
    const day = dayjs().format("DD/MM")
    try {
        await db.collection('accountMovements').insertOne({ value, description, day, userId: user._id })
        res.sendStatus(200);
    }catch{
        res.send('Ocorreu um erro inesperado, tente novamente');
    }
}

export async function getMovement(req, res){
    const { authorization } = req.headers;
    
    const token = authorization?.replace('Bearer ', '');
    if(!token){return res.sendStatus(401);}

    const session = await db.collection('sessions').findOne({ token });
    if(!session){return res.sendStatus(401);}

    const userId = session.userId;
    const userMovements = await db.collection('accountMovements').find({ userId }).toArray();
    res.send(userMovements);
}
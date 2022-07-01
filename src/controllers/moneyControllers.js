import { db } from '../mongo/mongoConfig.js';
import dayjs from 'dayjs';


export async function registerMovement(req, res){
    
    const { value, description } = req.body;
    const user = res.locals.user;

    const day = dayjs().format("DD/MM")
    try {
        await db.collection('accountMovements').insertOne({ value, description, day, userId: user._id })
        res.sendStatus(200);
    }catch{
        res.send('Ocorreu um erro inesperado, tente novamente');
    }
}

export async function getMovement(req, res){

    const session = res.locals.session;

    const userId = session.userId;
    const userMovements = await db.collection('accountMovements').find({ userId }).toArray();
    res.send(userMovements);
}
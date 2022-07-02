import { db } from '../mongo/mongoConfig.js';

export async function sessionValidation(req, res, next){

    const token = res.locals.token;

    const session = await db.collection('sessions').findOne({ token });
    if(!session){return res.status(401).send('sessão não encontrada');}

    res.locals.session = session;

    next();
}
import { db } from '../mongo/mongoConfig.js';

export async function userExistValidation(req, res, next){

    const session = res.locals.session;

    const user = await db.collection('users').findOne({_id: session.userId });
    if(!user){return res.sendStatus(401);}

    res.locals.user = user;
    next();
}
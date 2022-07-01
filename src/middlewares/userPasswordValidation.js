import { db } from '../mongo/mongoConfig.js';
import { v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';

export async function userPasswordValidation(req, res, next){

    const { email, password } = req.body;
    
    const user = await db.collection('users').findOne({ email });

    if(user && bcrypt.compareSync(password, user.password)){
        res.locals.token = uuid();
        res.locals.user = user;
        next();
    }else{
        return res.status(401).send('Usuário ou senha incorretos');
    }
}
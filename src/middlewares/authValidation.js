export async function authValidation(req, res, next){
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token){return res.status(401).send('token inválido');}

    res.locals.token = token;
    next();
}
import joi from 'joi';

export async function signInFormValidation(req, res, next){

    const { email, password } = req.body;

    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required() 
    });

    const { error } = signInSchema.validate({ email, password });

    if(joi.isError(error)){
        return res.status(400).send('Login inválido, por favor verifique.');
    }

    next();
}
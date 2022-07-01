import joi from 'joi';

export async function accountMovementValidation(req, res, next){

    const movementSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required()
    });
    
    const { value, description } = req.body;
    const { error } = movementSchema.validate({ value, description });
    if(joi.isError(error)){
        return res.status(422).send('Informações inválidas, por favor verifique');
    } 

    next();
}
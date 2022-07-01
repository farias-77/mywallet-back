import { accountMovementValidation } from '../middlewares/accountMovementValidation.js'
import { registerMovement, getMovement } from '../controllers/moneyControllers.js';
import { userExistValidation } from '../middlewares/userExistValidation.js'; 
import { sessionValidation } from '../middlewares/sessionValidation.js';
import { authValidation } from '../middlewares/authValidation.js';
import express from 'express';

const router = express.Router();

router.post('/accountMovement', authValidation, accountMovementValidation, sessionValidation, userExistValidation, registerMovement);
router.get('/accountMovement', authValidation, sessionValidation, getMovement);

export default router;
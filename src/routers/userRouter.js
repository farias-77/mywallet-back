import { signUpUser, signInUser } from '../controllers/userControllers.js';
import { signUpFormValidation } from '../middlewares/signUpFormValidation.js';
import express from 'express';


const router = express.Router();

router.post('/sign-up', signUpFormValidation, signUpUser);
router.post('/sign-in', signInUser);

export default router;
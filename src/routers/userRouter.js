import { signUpUser, signInUser } from '../controllers/userControllers.js';
import { signUpFormValidation } from '../middlewares/signUpFormValidation.js';
import { signInFormValidation } from '../middlewares/signInFormValidation.js';
import { userPasswordValidation } from '../middlewares/userPasswordValidation.js';
import express from 'express';

const router = express.Router();

router.post('/sign-up', signUpFormValidation, signUpUser);
router.post('/sign-in', signInFormValidation, userPasswordValidation, signInUser);

export default router;
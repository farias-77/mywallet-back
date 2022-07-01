import { registerMovement, getMovement } from '../controllers/moneyControllers.js';
import express from 'express';


const router = express.Router();

router.post('/accountMovement', registerMovement);
router.get('/accountMovement', getMovement)

export default router;
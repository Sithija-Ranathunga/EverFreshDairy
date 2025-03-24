import express from 'express';
import { createMilkingSession, getMilkingSession, getMilkingSessionById, updateMilkingSession, deleteMilkingSession } from '../controllers/MilkingSession.js'

const router = express.Router();

//Router for milking data
router.post('/', createMilkingSession);
router.get('/', getMilkingSession);
router.get('/:id',getMilkingSessionById);
router.put('/:id',updateMilkingSession);
router.delete('/:id',deleteMilkingSession);

export default router;
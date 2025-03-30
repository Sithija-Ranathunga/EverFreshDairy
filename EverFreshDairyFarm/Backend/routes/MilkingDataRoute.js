import express from 'express';
import { createMilkingData, getMilkingData, getMilkingDataById, updateMilkingData, deleteMilkingData } from '../controllers/MilkingData.js'; 

const router = express.Router();

// Routes for milking data
router.post('/', createMilkingData); 
router.get('/', getMilkingData); 
router.get('/:id', getMilkingDataById); 
router.put('/:id', updateMilkingData); 
router.delete('/:id', deleteMilkingData); 

export default router;

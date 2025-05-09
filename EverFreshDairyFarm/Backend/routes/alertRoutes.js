import express from 'express';
import { createAlert, getAlerts, resolveAlert } from '../controllers/alertController.js';

const router = express.Router();

router.post('/', createAlert);
router.get('/', getAlerts);
router.put('/:id/resolve', resolveAlert);

export default router;
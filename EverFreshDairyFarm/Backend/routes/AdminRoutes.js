import express from 'express';
import { 
  registerAdmin, 
  loginAdmin, 
  getAdminData 
} from '../controllers/adminController.js';
import { adminAuth } from '../controllers/adminController.js';

const router = express.Router();

// Initial setup route (should be disabled after first admin is created)
router.post('/setup', registerAdmin);
router.post('/login', loginAdmin);
router.get('/admin', adminAuth, getAdminData);

export default router;
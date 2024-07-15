
import express from 'express';
import
 { 
    getUserProfile,
    getPendingDoctors,
    updateStatus
    } from '../Controllers/adminController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router()

 
router.get('/profile',authenticate,restrict(['admin']), getUserProfile)
router.get('/approvals',authenticate,restrict(['admin']), getPendingDoctors)
router.put('/approvals/:id',authenticate,restrict(['admin']), updateStatus)
 


export default router;
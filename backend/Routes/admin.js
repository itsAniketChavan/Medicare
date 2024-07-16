
import express from 'express';
import
 { 
    getUserProfile,
    getPendingDoctors,
    updateStatus,
    getAlldoctors,
    deleteDoctor
    } from '../Controllers/adminController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router()

 
router.get('/profile',authenticate,restrict(['admin']), getUserProfile)
router.get('/approvals',authenticate,restrict(['admin']), getPendingDoctors)
router.put('/approvals/:id',authenticate,restrict(['admin']), updateStatus)
router.get('/all/doctors',authenticate,restrict(['admin']), getAlldoctors)
router.delete('/doctor/:id',authenticate,restrict(['admin']), deleteDoctor)
 


export default router;
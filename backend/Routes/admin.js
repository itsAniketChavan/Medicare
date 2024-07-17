
import express from 'express';
import
 { 
    getUserProfile,
    getPendingDoctors,
    updateStatus,
    getAlldoctors,
    deleteDoctor,
    getAllUsers,
    deleteUser
    } from '../Controllers/adminController.js';

import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router()

 
router.get('/profile',authenticate,restrict(['admin']), getUserProfile)
router.get('/approvals',authenticate,restrict(['admin']), getPendingDoctors)
router.put('/approvals/:id',authenticate,restrict(['admin']), updateStatus)
router.get('/all/doctors',authenticate,restrict(['admin']), getAlldoctors)
router.delete('/doctor/:id',authenticate,restrict(['admin']), deleteDoctor)
router.get('/all/users',authenticate,restrict(['admin']), getAllUsers)
router.delete('/users/:id',authenticate,restrict(['admin']), deleteUser)
 


export default router;
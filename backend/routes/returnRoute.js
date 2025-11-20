// routes/returnRoutes.js
import express from 'express';
import { approveReturnRequest, createReturnRequest, getReturnRequests, rejectReturnRequest, updateReturnStatus } from '../controllers/returnController.js';
import authUser from '../middleware/Auth.js';
import adminAuth from '../middleware/adminAuth.js';

const returnRouter = express.Router();

// Route to create a new return request
returnRouter.post('/create',authUser, createReturnRequest);

// Route to get all return requests
returnRouter.get('/', getReturnRequests);

// Route to update return status (approve or reject)
returnRouter.put('/approve-reject', updateReturnStatus);

returnRouter.put('/return/:id/approve', approveReturnRequest);
returnRouter.put('/:id/reject', adminAuth, rejectReturnRequest);

returnRouter.put('/update-status', adminAuth, updateReturnStatus);
export default returnRouter;

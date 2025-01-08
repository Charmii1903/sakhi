import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import authUser from '../middleware/Auth.js';



const profileRouter = express.Router();

// Fetch profile data
profileRouter.get('/', authUser, getProfile);

// Update profile data
profileRouter.put('/', authUser, updateProfile);

export default profileRouter;

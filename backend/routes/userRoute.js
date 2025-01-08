import express from 'express';
import { adminLogin, loginUser, registerUser} from '../controllers/userController.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import authUser from '../middleware/Auth.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', authUser, getProfile);
userRouter.put('/profile', authUser, updateProfile);


export default userRouter;
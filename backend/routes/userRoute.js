import express from 'express';
import { addToWishlist, adminLogin, getUserData, getWishlist, isAuthenticated, loginUser, logout, registerUser, removeFromWishlist, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail} from '../controllers/userController.js';
import { getProfile,  updateProfile } from '../controllers/profileController.js';
import authUser from '../middleware/Auth.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logout);
userRouter.post('/send-verify-otp',authUser, sendVerifyOtp);
userRouter.post('/verify-account',authUser, verifyEmail);
userRouter.get('/is-auth',authUser, isAuthenticated);
userRouter.post('/send-reset-otp', sendResetOtp);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/admin', adminLogin);
userRouter.get('/profile', authUser, getProfile);
userRouter.put('/update-profile', authUser, updateProfile);
userRouter.post('/add', authUser,addToWishlist);
userRouter.get('/wishlist/:userId',authUser,getWishlist);
userRouter.post('/wishlist/remove', authUser, removeFromWishlist);



export default userRouter;
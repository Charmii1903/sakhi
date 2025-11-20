import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from "../config/nodemailer.js";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required' });
        }

    
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        
        const token = createToken(user._id);

        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

      
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

// route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password , address, phone} = req.body;
        // if (!name || !email || !password){
        //     return res.json({success : false, message: 'Missing Details'})
        // }
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        

        res.cookie('token',token, {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
        });
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Sakhi',
            html :
             `<div style="font-family: Arial, sans-serif; text-align: center; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">Welcome ${name} .</h2>
                    <p>Your account has been created. 
            Explore season-wise collections, trendy styles,and exclusive designs crafted for every occasion. Stay stylish with our curated picks that blend comfort and elegance. Shop now and redefine your wardrobe with our bestsellers and latest arrivals.</p>
                    <img 
                        src="https://res.cloudinary.com/djjrhbo0g/image/upload/v1736492316/zjf3gkppkhvghzrrttcz.png" 
                        alt="Welcome" 
                        style="width: 100%; max-width: 400px; border-radius: 10px; margin: 20px 0;" 
                    />
                    <p>Visit our website to explore more.</p>
                    <a href="https://www.example.com" 
                       style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                       Visit Now
                    </a>
                </div>`
        }

        await transporter.sendMail(mailOptions);

        res.json({ success: true, token,  userId: newUser._id });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// for user logout
export const logout = async(req, res )=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 
            'none' : 'strict',
        })

        return res.json({success : true , message: "Logged out"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
// for otp verification
export const sendVerifyOtp = async (req, res) =>{
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (user.isAccountVerified) {
            return res.json ({success: false, message: "Account is already verified"})
        }

    const otp =  String(Math.floor(100000 +  Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 10000

    await user.save();

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to: user.email,
        subject: 'Account verification otp ',
        text: `Your otp is ${otp}. Verify your account using this OTP.`
    }

    await transporter.sendMail(mailOptions);

    res.json({ success : true, message: 'Verification OTP sent on email ' });

    } catch (error) {
        res.json({ success : false, message: error.message});
    }
}
//for email verification
export const verifyEmail = async (req, res) =>{
    const {userId, otp} = req.body;

    if (!userId || !otp) {
        return res.json({success: false, message: 'Missing Details'});
    }
    try {
        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success: false, message: 'User not found'});
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.verifyOtpExpiredAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiredAt = 0;

        await user.save();
        return res.json({success: true, message: 'Email verified successfully'});

    } catch (error) {
        res.json({ success : false, message: error.message});
    }
}
//for user authentication 
export const isAuthenticated = async (req,res) =>{
    try {
        return res.json({success: true});
    } catch (error) {
        res.json({success : false, message : error.message})
    }
}

//send password reset otp
export const sendResetOtp = async(req, res)=>{
    const {email} = req.body;

    if (!email) {
        return res.json({success: false, message: 'Email is required'})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }

        const otp =  String(Math.floor(100000 +  Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 10000

    await user.save();

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Otp ',
        text: `Your OTP for reseting the password is ${otp}. 
        Use this Otp to proceed with resetting your password.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({success: true, message: 'OTP sent to your email'});
    } catch (error) {
        res.json({success : false, message : error.message})
    }
}

// reset user password 
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({success: false, message: 'Email, OTP, and new password required'});
    }
    try {
        const user = await userModel.findOne({email})
        if (!user) {
            res.json({success: false, message: 'User not found'});
        }

        if(user.resetOtp === " " || user.resetOtp !== otp){
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if (user.resetOtpExpiredAt < Date.now()){
            return res.json({success: false, message: 'OTP Expired'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiredAt = 0;

        await user.save();

        return res.json({success: true, message: 'Password has been reset successfully'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId).select('-password -resetOtp -verifyOtp');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        }

        user.wishlist.push(productId);
        await user.save();

        return res.status(200).json({ success: true, message: "Product added to wishlist" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();

        return res.status(200).json({ success: true, message: "Product removed from wishlist" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// Get Wishlist
export const getWishlist = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId).populate("wishlist");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, wishlist: user.wishlist });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};




export { loginUser, registerUser, adminLogin };

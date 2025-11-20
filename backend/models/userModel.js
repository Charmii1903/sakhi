// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name : { type : String, required :true } ,
//     email : { type : String, required :true, unique: true},
//     password : { type : String, required :true},
//     verifyOtp : { type: String, },
//     verifyOtpExpiredAt : { type: Number, default: 0 },
//     isAccountVerified : { type: Boolean, default: false },
//     resetOtp : { type: String, default : ''},
//     resetOtpExpiredAt : { type: Number, default : 0},
//     cartData : { type : Object, default:{} },
//     phone: { type: String },
//     address: { type: String },
//     profilePicture: { type: String },
// },{minimize:false})

// const userModel = mongoose.models.user || mongoose.model('user',userSchema);

// export default userModel;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAccountVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '' },
    verifyOtpExpiredAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: '' },
    resetOtpExpiredAt: { type: Number, default: 0 },
    cartData : { type : Object, default:{} },
    role: {type : Number, default:0 },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    // Profile fields
    
    address: { type: String, default: '' },
    profilePicture: { type: String, default: '' }, // Store image URL
    phone: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

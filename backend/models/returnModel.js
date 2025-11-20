// // models/returnModel.js
// import mongoose from 'mongoose';

// const returnSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//     reason: { type: String, required: true },
//     status: { type: String, default: 'Pending' },
//     createdAt: { type: Date, default: Date.now },
// });

// const Return = mongoose.models.Return || mongoose.model('Return', returnSchema);

// export default Return;

import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Return', returnSchema);


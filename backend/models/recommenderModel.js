import mongoose from "mongoose";

const recommenderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  interactionType: { type: String }, // e.g., "viewed", "purchased"
});

export default mongoose.model("Recommender", recommenderSchema);

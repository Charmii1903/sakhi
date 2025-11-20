import express from "express";
import { getRecommendations } from "../controllers/recommenderController.js";

const recommenderRouter = express.Router();

// Route to fetch product recommendations
recommenderRouter.get("/recommendations/:userId", getRecommendations);

export default recommenderRouter;

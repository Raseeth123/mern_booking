import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js"
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log("Server Started at http://localhost:5000");
});

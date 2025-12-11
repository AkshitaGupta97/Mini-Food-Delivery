import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() => {
    // Use MongoDB URI from environment variables or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || "mongodb+srv://gungunakshita37gupta973_db_user:mongo5678database@cluster0.eqxxxzn.mongodb.net/food-delivery";
    
    try {
        await mongoose.connect(mongoURI);
        console.log("✓ Database connected successfully");
    } catch(error) {
        console.error("✗ Database connection failed:", error.message);
        // Server continues even if DB connection fails
    }

}


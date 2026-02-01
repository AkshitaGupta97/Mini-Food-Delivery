import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
  try {
    mongoose.set("bufferCommands", false);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✓ MongoDB connected successfully");

    console.log("DB State:", mongoose.connection.readyState);

  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

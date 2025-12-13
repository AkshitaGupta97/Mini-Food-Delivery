import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() => {
    // Use MongoDB URI from environment variables or fallback to local MongoDB
   // const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/food-delivery";
    

  /* try {
    const mongoURI = "mongodb+srv://gungunakshita37gupta973_db_user:food123@cluster0.eqxxxzn.mongodb.net/food-delivery";
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
   }
    catch(error){
        console.error("✗ MongoDB connection failed:", error.message);
        process.exit(1); // Exit process if DB connection fails
    }
    */

  await mongoose.connect('mongodb+srv://gungunakshita37gupta973_db_user:food123@cluster0.eqxxxzn.mongodb.net/food-delivery')
   .then(() => console.log('✓ MongoDB connected successfully'))
   .catch((error) => console.error("✗ MongoDB connection failed:", error.message));
    
   
}


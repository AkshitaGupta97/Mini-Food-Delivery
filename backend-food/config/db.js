import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose.connect("mongodb+srv://gungunakshita37gupta973_db_user:mongodbPassword890Akshita123@cluster0.ljesnbu.mongodb.net/food-delivery")
    .then(() => console.log("Database connected"))
}


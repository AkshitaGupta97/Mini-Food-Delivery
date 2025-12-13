
import foodModel from "../models/foodModels.js";
import fs from "fs"
import mongoose from "mongoose";
// fs is used for some operations as readFile, deleteFile, createfile
// add food item

const addFood = async(req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        console.error("No image file provided");
        return res.json({ success: false, message: "Image is required" });
    }

    // Extract the filename of the uploaded image
    let image_filename = `${req.file.filename}`;

    // Cast/normalize incoming values
    const priceValue = Number(req.body.price);

    // Create new food item with form data and image filename
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: priceValue,
        category: req.body.category,
        image: image_filename
    })

    // Save to database
    try {
        // Log mongoose connection state for debug (0 = disconnected, 1 = connected)
        console.log("Mongoose readyState:", mongoose.connection.readyState);

        await food.save();
        console.log("Food item added successfully:", image_filename);
        res.json({ success: true, message: "Food Added" })
    }
    catch(error) {
        console.error("Error saving food to database:", error);
        res.json({ success: false, message: "Error adding food: " + (error.message || "Unknown") })
    }
}

// we can create/add all new food
const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods})
    }   
    catch(error){
        console.log(error);
        res.json({success:false, message:"error"})
    }
}

// we can remove food item
const removeFood = async(req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"food item is removed"})

    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"error in deleting food item"})
    }
}

export {addFood, listFood, removeFood}
